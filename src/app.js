import express from "express"
import { engine } from 'express-handlebars';
import __dirname from "./utils.js"
// import ProductManager from "./dao/file-managers/ProductManager.js";
// import cartManager from "./dao/file-managers/cart.js"
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.routes.js";
import viewstRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import mongoose from 'mongoose';

const app = express()

app.use(express.static(__dirname + '/../public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// const products = new ProductManager()
// const cartManagerr = new cartManager ()

app.use (express.json())

mongoose.connect("mongodb+srv://backend:backend123@proyectobackend.jitxkya.mongodb.net/proyecto-backend?retryWrites=true&w=majority").then((conn) => {
    console.log("Connected to DB!");
});

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

// export {cartManagerr, products}
