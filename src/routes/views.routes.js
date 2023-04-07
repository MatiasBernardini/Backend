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

    const data = {
        products: product.docs.map ((p) => ({
            title: p.title,
            description: p.description,
            price: p.price,
            code: p.code,
            stock: p.stock,
        })),
        totalDocs: product.totalDocs,
        limit: product.limit,
        totalPages: product.totalPages,
        page: product.page,
        pageCounter: product.pageCounter,
        hasPrevPage: product.hasPrevPage,
        hasNextPage: product.hasNextPage,
        prevPage: product.prevPage,
        nextPage: product.nextPage,
    }

    res.render("home", data )
})

// viewstRouter.get("/real_time_products", async (req,res)=>{
//     const product = await products.getProducts()
//     res.render("real_time_products", {product})                
// })

viewstRouter.get("/carts/:cid", async (req,res)=>{
    const {cid} = req.params

    const cart = await Carts.getCartProducts(cid)

    const cartProducts = cart.products

    res.render("cart", {cartProducts})
})


// viewstRouter.get ("/products", asyn (req, res) => {

// })

export default viewstRouter;