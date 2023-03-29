import { Router, json } from "express";
// import {products} from "../app.js";
import {productManager} from "../dao/index.js"

const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get('/', async (req, res) => {
    const product = await productManager.getProducts()
    res.render('home', {product});
});

viewstRouter.get("/real_time_products", async (req,res)=>{
    const product = await productManager.getProducts()
    res.render("real_time_products", {product})                
})

export default viewstRouter;