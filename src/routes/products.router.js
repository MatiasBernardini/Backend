import { Router, json } from "express";
// import {products} from "../app.js";
import {productManager} from "../dao/index.js"

const products = new productManager ();
const productRouter = Router ();

productRouter.use (json());

productRouter.get ("/", async (req, res) =>{
    const {limit} = req.query
    
    const {page} = req.query

    const {sort} = req.query

    const {stock} = req.query

    const query = {stock}

    const product = await products.getProducts(limit, page, sort, query);

    res.send (product)
})

productRouter.get ("/:id", async (req, res) =>{
    try{
        const {id} = req.params
        const product = await manager.getProductById(id)
        res.send({status: "succes", payload: product})
    } catch(err) {
        res.status(404).send({status: "error", error: `${err}`})
    }
})

productRouter.post ("/addProduct", async (req, res) =>{
    const productData = req.body;
    
    console.log (productData)

    const product = await products.addProduct (productData);

    req.io.emit("added-Product", req.body)

    res.send (product); 
} )

// productRouter.put ( "/:id", async (req, res) => {
//     const {id} = req.params
    
//     const idProduct = parseInt(id)

//     const product = await products.updateProduct(idProduct, req.body)

//     const productEmit = await products.getProducts()
//     req.io.emit("update-Product", productEmit)

//     res.send(product)
// } )

    productRouter.put("/:id", async (req, res)=>{
        try{
            const {id} = req.params
            await products.updateProduct(id, req.body)

            const productEmit = await products.getProducts()
            req.io.emit("update-product", productEmit)
        
            res.send({status: "succes", payload: await products.getProductById(id)})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    })




    productRouter.delete("/:id", async(req, res)=>{
        try{
            const {id} = req.params
            await products.deleteProduct(id)

            const product = await products.getProducts()
            req.io.emit("delete-product", product)

            res.send({status: "succes", payload: "Producto eliminado"})
        } catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    })

export default productRouter; 