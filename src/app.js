import ProductManager from "./index.js";
import express from "express"

const product = new ProductManager("./product.json")

const app = express()

app.use (express.json())

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

app.delete ("/products/:id", async (req, res) => {
    const id = await Number(req.params.id);

    const products = await product.deleteProduct(id);

    res.send(products);
})

app.post ("/products/addProduct", async (req, res) =>{
    const productData = req.body;
    
    console.log (productData)

    const products = await product.addProduct (productData);

    res.send (products); 
} )

/* hola lauti, intente de mil maneras que me funcione el app.put pero no estaría encontrandole la solucion. Si me podrías ayudar me vendría de 10 (ya que estuve todo el día intentando pero no le pude agarrar la mano) Gracias!!*/ 

app.put ( "/products/:id", async (req, res) => {
    const products = req.body ;

    const id = await Number(req.params.id);

    const productsId = await product.getProductById(id);

    const newProduct = await product.updateProduct(productsId, products)

    res.send(newProduct);
} )

app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

