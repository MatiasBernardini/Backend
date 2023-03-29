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
    const {cid} = req.params

    let cart = await Carts.getCartById(parseInt(cid))

    res.send(cart)
 
})

cartsRouter.post("/:cid/products/:pid", async (req,res)=>{
    const {cid, pid} = req.params

    const productID = parseInt(pid)

    const cartID = parseInt(cid)

    console.log (productID)
    console.log (cartID)

    let product = await productsManager.getProductById(productID)

    console.log (product)

    await Carts.addProductToCart(product, cartID)

    res.send(await Carts.getCartById(cartID))
})

export default cartsRouter