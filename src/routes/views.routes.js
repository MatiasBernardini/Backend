import { Router, json } from "express";
import {products} from "../app.js";

const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get('/', async (req, res) => {
    const product = await products.getProducts()
    res.render('home', {product});
});

export default viewstRouter;