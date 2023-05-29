import { productService, cartService } from "../repository/index.js"
import {v4 as uuidv4} from 'uuid';
import { ticketsModel } from "../dao/models/ticket.model.js";

import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateCartErrorParam } from "../services/cartError.js";
import { generateProductErrorParam } from "../services/productError.js";


class cartController{
    static add_Cart = async (req,res) =>{
        const newProductCart = await cartService.addCart()

        res.send(newProductCart)
    }

    static get_Cart = async (req,res) =>{
        try{
            const {cid} = req.params

            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };

            let cart = await cartService.getCart(cid)
            res.send({status: "succes", payload: cart})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_ProductInCart = async (req,res) =>{
        try{
            const {cid, pid } = req.params
            const {quantity} = req.body

            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };
            const productId = parseInt(pid);
            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error",
                    cause:generateProductErrorParam(pid),
                    message:"Error al encontrar el producto",
                    errorCode:EError.INVALID_PARAM
                });
            };

            let product = await productService.getProductById(pid)

            await cartService.addProductInCart(product, cid, quantity)

            res.send({status: "succes", payload: await cartService.getCart(cid)})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_ArrayToCart = async (req,res) =>{
        try{
            const {cid} = req.params
            const arr = req.body;
    
            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };

            const result = await cartService.addArrayToCart(cid, arr);
    
            res.send({status: "succes", payload: result})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }

    static put_QuantityUpdated = async (req,res) =>{
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body

            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };
            const productId = parseInt(pid);
            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error",
                    cause:generateProductErrorParam(pid),
                    message:"Error al encontrar el producto",
                    errorCode:EError.INVALID_PARAM
                });
            };



            await cartService.putQuantityUpdated(cid, pid, quantity)
    
            res.send({ status: "succes", payload: "Quantity Updated." })
        } catch (err) {
            res.status(404).send({ status: "error", error: err.message })
        }
    }

    static delete_ProductInCart = async (req,res) =>{
        try{
            const{cid} = req.params;
            const {pid} = req.params;

            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };
            const productId = parseInt(pid);
            if(Number.isNaN(productId)){
                CustomError.createError({
                    name:"Product id error",
                    cause:generateProductErrorParam(pid),
                    message:"Error al encontrar el producto",
                    errorCode:EError.INVALID_PARAM
                });
            };

            const prodToDel = await cartService.deleteProductInCart(cid,pid);
    
            res.send({status: "succes", payload: prodToDel})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }

    static delet_AllProductsInCart = async (req,res) =>{
        try{
            const {cid} = req.params

            const cartId = parseInt(cid);
            if(Number.isNaN(cartId)){
                CustomError.createError({
                    name:"Cart param error",
                    cause:generateCartErrorParam(cid),
                    message:"Error al encontrar el carrito solicitado (Parametro mal pasado)",
                    errorCode:EError.INVALID_PARAM
                });
            };

            await cartService.deletAllProductsInCart(cid)
            
            res.send({status: "succes", payload: "Todos los Productos eliminados."})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }
    
    static get_Purchase = async (req,res) =>{
        try{
            const {cid} = req.params
            let cart = await cartService.getCart(cid)

            if (cart){
                if (!cart.products.length){
                    return res.send ("su carrito se encuentra vacio, agregue algun producto")
                }

                const ticketProducts = [];
                const rejectedProducts = [];

                let prices = 0;

                for (let i=0; i<cart.products.length; i++){
                    const cartProduct = cart.products [i];

                    const productDb = await productService.getProductById(cartProduct.product)

                    if(cartProduct.quantity<=productDb.stock){
                        const quantityUpdate = productDb.stock - cartProduct.quantity

                        await productService.updateQuantity (productDb, quantityUpdate)  

                        ticketProducts.push(cartProduct);

                        await cartService.deleteProductInCart (cart, productDb)
                        
                        prices = productDb.price + prices;

                    } else {
                        rejectedProducts.push(cartProduct);

                        console.log (`el id, del siguiente producto no pudo realizarse su compra: ${productDb.id} (${productDb.title})`)
                    }

                }

                if (ticketProducts.length) {
                    let newTicket = {
                        code:uuidv4(),
                        purchase_datetime: new Date().toLocaleString(),
                        amount: prices,
                        purchaser: req.user.email
                    }
    
                    const ticketCreated = await ticketsModel.create(newTicket);
                    return res.send(ticketCreated)
                } else {
                    return res.send(rejectedProducts)
                }

            } else{
               return res.send ("el carrito no existe")
            }
        }catch(err){
            console.log (err)
            res.status(404).send({status: "error", error: `${err}`})
        }
    }
}

export {cartController}