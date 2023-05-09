import {productManager} from "../dao/index.js"

const products = new productManager ();

class productsController {
    static get_Products = async (req, res) => {
        const {limit} = req.query
    
        const {page} = req.query
    
        const {sort} = req.query
    
        const {stock} = req.query
    
        const query = {stock}
    
        const product = await products.getProducts(limit, page, sort, query);
    
        res.send (product)
    } 

    static get_Product_Id = async (req,res) => {
        try{
            const {id} = req.params
            const product = await products.getProductById(id)
            res.send({status: "succes", payload: product})
        } catch(err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_Product = async (req, res) => {
        try {
            const { title, description, price, thumbail, code, stock} = req.body

            await products.addProduct(title, description, parseInt(price), thumbail, code, parseInt(stock))

            req.io.emit("added-Product", req.body)

            res.send({ status: "succes", payload: req.body })
        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static update_Product = async (req, res) => {
        try{
            const {id} = req.params
            await products.updateProduct(id, req.body)
    
            const productEmit = await products.getProducts()
            req.io.emit("update-product", productEmit)
        
            res.send({status: "succes", payload: await products.getProductById(id)})
        }catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static delete_Product = async (req, res) => {
        try{
            const {id} = req.params
            await products.deleteProduct(id)
    
            const product = await products.getProducts()
            req.io.emit("delete-product", product)
    
            res.send({status: "succes", payload: "Producto eliminado"})
        } catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }
}

export {productsController}