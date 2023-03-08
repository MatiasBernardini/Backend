import { Router ,json } from "express";
import {products, cartManagerr} from "../app.js";

const cartsRouter = Router()

cartsRouter.use(json())

cartsRouter.post("/", async (req,res)=>{
    const newProductCart = await cartManagerr.addCart()

    res.send(newProductCart)
})

cartsRouter.get("/:cid", async (req, res)=>{
    const {cid} = req.params

    let cart = await cartManagerr.getCartById(parseInt(cid))

    res.send(cart)

})

cartsRouter.post("/:cid/products/:pid", async (req,res)=>{
    const {cid, pid} = req.params

    const productID = parseInt(pid)

    const cartID = parseInt(cid)

    console.log (productID)
    console.log (cartID)

    let product = await products.getProductById(productID)

    console.log (product)

    await cartManagerr.addProductToCart(product, cartID)

    res.send(await cartManagerr.getCartById(cartID))
})

export default cartsRouter