import { Router, json } from "express";
import ProductManager from "../index.js";

const productRouter = Router ();

const product = new ProductManager("./Product.json")

productRouter.use (json());

productRouter.get ("/", async (req, res) =>{
    const products = await product.getProducts ();

    const {limit} = req.query
    
    if (limit){
        products.length = limit
        return res.send(products)
    }

    res.send (products)
})

productRouter.get ("/:id", async (req, res) =>{
    const id = await Number(req.params.id);

    const products = await product.getProductById(id);

    res.send(products);

    if (!products){
        throw new Error ("ID no encontrado")
    }
})

productRouter.post ("/addProduct", async (req, res) =>{
    const productData = req.body;
    
    console.log (productData)

    const products = await product.addProduct (productData);

    res.send (products); 
} )

productRouter.put ( "/:id", async (req, res) => {
    const {id} = req.params
    const idProduct = parseInt(id)

    await product.updateProduct(idProduct, req.body)

    res.send({status: "succes", payload: await product.getProductById(id)})
} )


productRouter.delete ("/:id", async (req, res) => {
    const id = await Number(req.params.id);

    const products = await product.deleteProduct(id);

    res.send(products);
})

export default productRouter;