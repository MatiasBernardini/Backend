import { Router, json } from "express";
import {productManager, CartManager} from "../dao/index.js"

const products = new productManager ();
const Carts = new CartManager ();
const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get("/", async (req, res) => {
    const { page, limit, sort, stock } = req.query
    const query = {stock}
    const product = await products.getProducts(page, limit, sort, query)
    res.render("home", { product })
})

// viewstRouter.get("/real_time_products", async (req,res)=>{
//     const product = await products.getProducts()
//     res.render("real_time_products", {product})                
// })

viewstRouter.get("/carts/:cid", async (req,res)=>{
    const {cid} = req.params
    console.log(cid)
    const cart = await Carts.getCartProducts(cid)
    console.log (cart)
    const cartProducts = cart.products
    console.log(cartProducts)
    res.render("cart", {cartProducts})
})


// viewstRouter.get ("/products", asyn (req, res) => {

// })

export default viewstRouter;