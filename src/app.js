import express from "express"
import productRouter from "./routes/products.router.js";

const app = express()

app.use ("/api/products", productRouter)

app.use (express.json())

app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

