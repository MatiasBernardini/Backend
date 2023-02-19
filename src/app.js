import ProductManager from "./index.js";
import express from "express"

const product = new ProductManager("./product.json")

const app = express()

app.get ("/products", async (req, res) =>{
    const products = await product.getProducts ();

    const {limit} = req.query
    
    if (limit){
        products.length = limit
        return res.send(products)
    }

    res.send (products)
})

app.get ("/products/:id", async (req, res) =>{
    const id = await Number(req.params.id);

    const products = await product.getProductById(id);

    res.send(products);

    if (!products){
        throw new Error ("ID no encontrado")
    }
})

app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

