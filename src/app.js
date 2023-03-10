import express from "express"
import { engine } from 'express-handlebars';
import __dirname from "./utils.js"
import ProductManager from "./ProductManager.js";
import cartManager from "./cart.js"
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.routes.js";
import viewstRouter from "./routes/views.routes.js";
import { Server } from "socket.io";

const app = express()

app.use(express.static(__dirname + '/../public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const products = new ProductManager("./Product.json")
const cartManagerr = new cartManager ("./Cart.json")

app.use (express.json())

const httpServer = app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

const io = new Server (httpServer)

io.on ("connection", (socket) => {
    console.log ("Nuevo cliente conectado")
})

app.use((req,res,next)=>{
    req.io = io
    next()
})

app.use ("/api/products", productRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewstRouter)

export {cartManagerr, products}
