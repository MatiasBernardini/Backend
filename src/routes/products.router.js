import { Router, json } from "express";
import {products} from "../app.js";

const productRouter = Router ();

productRouter.use (json());

productRouter.get ("/", async (req, res) =>{
    const product = await products.getProducts ();

    const {limit} = req.query
    
    if (limit){
        product.length = limit
        return res.send(product)
    }

    res.send (product)
})

productRouter.get ("/:id", async (req, res) =>{
    const id = await Number(req.params.id);

    const product = await products.getProductById(id);

    res.send(product);

    if (!product){
        throw new Error ("ID no encontrado")
    }
})

productRouter.post ("/addProduct", async (req, res) =>{
    const productData = req.body;
    
    console.log (productData)

    const product = await products.addProduct (productData);

    res.send (product); 
} )

productRouter.put ( "/:id", async (req, res) => {
    const {id} = req.params
    
    const idProduct = parseInt(id)

    const product = await products.updateProduct(idProduct, req.body)

    res.send(product)
} )


productRouter.delete ("/:id", async (req, res) => {
    const id = await Number(req.params.id);

    const product = await products.deleteProduct(id);

    res.send(product);
})

export default productRouter;