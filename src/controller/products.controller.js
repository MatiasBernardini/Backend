import { productService } from "../repository/index.js"
import { generateProductFaker } from "../utils.js"

import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo, updateProductErrorInfo ,generateProductErrorParam } from "../services/productError.js";
import { getUSerService, findUserByIdService } from "../repository/user.repository.js";
import { sendRemovedProductEmail } from "../utils/email.js";


class productsController {
    static get_Products = async (req, res) => {
        const {limit} = req.query
    
        const {page} = req.query
    
        const {sort} = req.query
    
        const {stock} = req.query
    
        const query = {stock}
    
        const product = await productService.getProduct(limit, page, sort, query);
    
        res.send (product)
    } 

    static get_Product_Id = async (req,res) => {
        try{
            const {id} = req.params

            const productId = parseInt(id);
            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error",
                    cause:generateProductErrorParam(id),
                    message:"Error al encontrar el producto",
                    errorCode:EError.INVALID_PARAM
                });
            };

            const product = await productService.getProductById(id)
            res.send({status: "succes", payload: product})
        } catch(err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_Product = async (req, res) => {
        try {
            const { title, description, price, code, stock, owner} = req.body
            if(!title || !description || !price || !code || !stock){
                CustomError.createError({
                    name:"Product create error",
                    cause:generateProductErrorInfo(req.body),
                    message:"Error creando el producto",
                    errorCode:EError.INVALID_JSON
                });
            };

            let owner1 = req.user._id;

            const product = await productService.addProduct(title, description, parseInt(price), code, parseInt(stock), owner1)

            req.io.emit("added-Product", req.body)

            res.send({ status: "succes", payload: product })
        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static update_Product = async (req, res) => {
        try {
            const {id} = req.params

            const productId = parseInt(id);
            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error",
                    cause:generateProductErrorParam(id),
                    message:"Error al encontrar el producto",
                    errorCode:EError.INVALID_PARAM
                });
            };

            const { title, description, price, code, stock} = req.body
            if(!title || !description || !price || !code || !stock){
                CustomError.createError({
                    name:"Product update error",
                    cause:updateProductErrorInfo(req.body),
                    message:"Error al actualizar el producto",
                    errorCode:EError.INVALID_JSON
                });
            };

            await productService.updateProduct(id, req.body)
    
            const productEmit = await productService.getProduct()
            req.io.emit("update-product", productEmit)
        
            res.send({status: "succes", payload: await productService.getProductById(id)})
        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static delete_Product = async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await productService.getProductById(productId);

            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error:",
                    cause:generateProductErrorParam(id),
                    message:"Error al encontrar el producto (Parametro invalido)",
                    errorCode:EError.INVALID_PARAM
                });
            };

            if(product){
                const productOwer = JSON.parse(JSON.stringify(product.owner));

                const userId = JSON.parse(JSON.stringify(req.user._id));

                if((req.user.rol === "premium" && productOwer == userId) || req.user.rol === "admin"){
                    if(req.user.rol === "admin" && productOwer != userId){

                        const allUser = await getUSerService ()

                        const usersId = allUser.map(user=>({id:user._id}))
    
                        const usuarioEncontrado = usersId.filter(user => user.id == productOwer);

                        const user = await findUserByIdService(usuarioEncontrado[0].id);

                        const userEmail = user.email;

                        await sendRemovedProductEmail (userEmail)    
                    }
                    await productService.deleteProduct(productId);

                    return res.json({status:"success", message:"producto eliminado"});

                }else {
                    res.json({status:"error", message:"no puedes borrar este producto"})
                }
            } else {
                return res.json({status:"error", message:"El producto no existe"});
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    static generate_Product_Faker = async (req, res) => {
        try {
            const cantidad = parseInt (req.query.cantidad) || 100;

            let products = [];

            for(let i=0;i<cantidad;i++){
                const product = generateProductFaker();
                products.push(product)
            };

            res.json({products}); 

        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }
}

export {productsController}