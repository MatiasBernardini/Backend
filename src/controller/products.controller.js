import {productManager} from "../dao/factory.js"

class productsController {
    static get_Products = async (req, res) => {
        const {limit} = req.query
    
        const {page} = req.query
    
        const {sort} = req.query
    
        const {stock} = req.query
    
        const query = {stock}
    
        const product = await productManager.getProducts(limit, page, sort, query);
    
        res.send (product)
    } 

    static get_Product_Id = async (req,res) => {
        try{
            const {id} = req.params
            const product = await productManager.getProductById(id)
            res.send({status: "succes", payload: product})
        } catch(err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static add_Product = async (req, res) => {
        try {
            const { title, description, price, code, stock} = req.body

            await productManager.addProduct(title, description, parseInt(price), code, parseInt(stock))

            req.io.emit("added-Product", req.body)

            res.send({ status: "succes", payload: req.body })
        } catch (err) {
            res.status(404).send({status: "error", error: `${err}`})
        }
    }

    static update_Product = async (req, res) => {
            const {id} = req.params
            await productManager.updateProduct(id, req.body)
    
            const productEmit = await productManager.getProducts()
            req.io.emit("update-product", productEmit)
        
            res.send({status: "succes", payload: await productManager.getProductById(id)})
    }

    static delete_Product = async (req, res) => {
        try{
            const {id} = req.params
            await productManager.deleteProduct(id)
    
            const product = await productManager.getProducts()
            req.io.emit("delete-product", product)
    
            res.send({status: "succes", payload: "Producto eliminado"})
        } catch(err){
            res.status(404).send({status: "error", error: `${err}`})
        }
    }
}

export {productsController}