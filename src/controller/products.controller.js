import { productService } from "../repository/index.js"
import { generateProductFaker } from "../utils.js"

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
            const product = await productService.getProductById(id)
            res.send({status: "succes", payload: product})
        } catch(err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_Product = async (req, res) => {
        try {
            const { title, description, price, code, stock} = req.body

            const product = await productService.addProduct(title, description, parseInt(price), code, parseInt(stock))

            req.io.emit("added-Product", req.body)

            res.send({ status: "succes", payload: product })
        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static update_Product = async (req, res) => {
            const {id} = req.params
            await productService.updateProduct(id, req.body)
    
            const productEmit = await productService.getProduct()
            req.io.emit("update-product", productEmit)
        
            res.send({status: "succes", payload: await productService.getProductById(id)})
    }

    static delete_Product = async (req, res) => {
        try{
            const {id} = req.params
            await productService.deleteProduct(id)
    
            const product = await productService.getProduct()
            req.io.emit("delete-product", product)
    
            res.send({status: "succes", payload: "Producto eliminado"})
        } catch(err){
            res.status(404).send({status: "error", error: `${err}`})
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