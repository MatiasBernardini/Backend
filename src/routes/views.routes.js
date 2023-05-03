import { Router, json } from "express";
import {productManager, CartManager} from "../dao/index.js"

const products = new productManager ();
const Carts = new CartManager ();
const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get("/", async (req, res) => {
    res.render ("home")
})

viewstRouter.get("/login", async (req, res) => {
    res.render ("login")
})

viewstRouter.get("/signup", async (req, res) => {
    res.render ("signup")
})

viewstRouter.get("/profile", async (req, res) => {
    if (!req.user){
        res.send (`Tiene que iniciar sesion, para ver su perfil <a href="/login">Incia sesion</a>`)
    } else {
        const {first_name, last_name, age, email, rol} = req.user

        const userInfo = {
            userFirst_name : first_name,
            userLast_name : last_name,
            userAge : age,
            userEmail : email,
            userRol : rol
        }

        res.render ("profile", {userInfo})
    }

    console.log (req.user)
})

viewstRouter.get("/products", async (req, res) => {
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

    res.render("products", data )
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