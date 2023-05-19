// import {productManager, CartManager} from "../dao/factory.js"
import { productService, cartService } from "../repository/index.js"
import {v4 as uuidv4} from 'uuid';
import { ticketsModel } from "../dao/models/ticket.model.js";

class cartController{
    static add_Cart = async (req,res) =>{
        const newProductCart = await cartService.addCart()

        res.send(newProductCart)
    }

    static get_Cart = async (req,res) =>{
        try{
            const {cid} = req.params
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
            console.log (quantity)
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
            const prodToDel = await cartService.deleteProductInCart(cid,pid);
    
            res.send({status: "succes", payload: prodToDel})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }

    static delet_AllProductsInCart = async (req,res) =>{
        try{
            const {cid} = req.params
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

                for (let i=0; i<cart.products.length; i++){
                    const cartProduct = cart.products [i];

                    const productDb = await productService.getProductById(cartProduct.product)

                    if(cartProduct.quantity<=productDb.stock){
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }

                }

                console.log("ticketProducts",ticketProducts)
                console.log("rejectedProducts",rejectedProducts)

                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date().toLocaleString(),
                    amount:500,
                    purchaser:req.user.email
                }
                const ticketCreated = await ticketsModel.create(newTicket);
                res.send(ticketCreated)

                /* PREGUNTAR EL POR QUE EL DATE NO FUNCIONA SI ESTA PUESTO EN EL MODEL, PERO SI FUNCIONA SI LO PASO A STRING */

            } else{
                res.send ("el carrito no existe")
            }


            res.send({status: "succes", payload: cart})
        }catch(err){
            console.log (err)
            res.status(404).send({status: "error", error: `${err}`})
        }
    }
}

export {cartController}