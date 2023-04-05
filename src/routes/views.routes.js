import { Router, json } from "express";
import {productManager} from "../dao/index.js"

const products = new productManager ();
const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get('/', async (req, res) => {
    const product = await products.getProducts()
    res.render('home', {product});
});

viewstRouter.get("/real_time_products", async (req,res)=>{
    const product = await products.getProducts()
    res.render("real_time_products", {product})                
})

// viewstRouter.get ("/products", asyn (req, res) => {

// })

// export default viewstRouter;