import { Router ,json } from "express";
// import {products, cartManagerr} from "../app.js";
import {productManager, CartManager} from "../dao/index.js"

const Carts = new CartManager ();
const productsManager = new productManager ();
let cartsRouter = Router()

cartsRouter.use(json())

cartsRouter.post("/", async (req,res)=>{
    const newProductCart = await Carts.addCart()

    res.send(newProductCart)
})

cartsRouter.get("/:cid", async (req, res)=>{
    try{
        const {cid} = req.params
        let cart = await Carts.getCartById(cid)
        res.send({status: "succes", payload: cart})
    }catch(err){
        res.status(404).send({status: "error", error: `${err}`})
    }
})

cartsRouter.post("/:cid/products/:pid", async (req,res)=>{
    try{
        const {cid, pid} = req.params
        let product = await productsManager.getProductById(pid)
        await Carts.addProductToCart(product, cid)
        res.send({status: "succes", payload: await Carts.getCartById(cid)})
    }catch(err){
        res.status(404).send({status: "error", error: `${err}`})
    }
})

export default cartsRouter