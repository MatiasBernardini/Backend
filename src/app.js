import express from "express"
import productRouter from "./routes/products.router.js";
import cartManager from "./cart.js"
import cartsRouter from "./routes/cart.routes.js";

const app = express()

const cartManagerr = new cartManager ("./Cart.json")

app.use ("/api/products", productRouter)
app.use("/api/carts", cartsRouter)

app.use (express.json())

app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

export default cartManagerr
