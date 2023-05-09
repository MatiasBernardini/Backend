import {productManager, CartManager} from "../dao/index.js"

const Carts = new CartManager ();
const productsManager = new productManager ();

class cartController{
    static add_Cart = async (req,res) =>{
        const newProductCart = await Carts.addCart()

        res.send(newProductCart)
    }

    static get_Cart = async (req,res) =>{
        try{
            const {cid} = req.params
            let cart = await Carts.getCartById(cid)
            res.send({status: "succes", payload: cart})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_ProductInCart = async (req,res) =>{
        try{
            const {cid, pid} = req.params
            let product = await productsManager.getProductById(pid)
            await Carts.addProductToCart(product, cid)
            res.send({status: "succes", payload: await Carts.getCartById(cid)})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_ArrayToCart = async (req,res) =>{
        try{
            const {cid} = req.params
            const arr = req.body;
    
            const result = await Carts.addArrayToCart(cid, arr);
    
            res.send({status: "succes", payload: result})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }

    static put_QuantityUpdated = async (req,res) =>{
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            await Carts.moreQuantity(cid, pid, quantity)
    
            res.send({ status: "succes", payload: "Quantity Updated." })
        } catch (err) {
            res.status(404).send({ status: "error", error: err.message })
        }
    }

    static delete_ProductInCart = async (req,res) =>{
        try{
            const{cid} = req.params;
            const {pid} = req.params;
            const prodToDel = await Carts.deleteProductInCart(cid,pid);
    
            res.send({status: "succes", payload: prodToDel})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }

    static delet_AllProductsInCart = async (req,res) =>{
        try{
            const {cid} = req.params
            await Carts.removingAllProductsFromCart(cid)
            res.send({status: "succes", payload: "Todos los Productos eliminados."})
        }catch(err){
            res.status(404).send({status: 'error', error: `${err}`})
        }
    }
    
}

export {cartController}