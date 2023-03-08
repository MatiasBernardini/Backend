import express from "express"
import { engine } from 'express-handlebars';
import __dirname from "./utils.js"
import productRouter from "./routes/products.router.js";
import ProductManager from "./ProductManager.js";
import cartManager from "./cart.js"
import cartsRouter from "./routes/cart.routes.js";

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const products = new ProductManager("./Product.json")
const cartManagerr = new cartManager ("./Cart.json")

app.use ("/api/products", productRouter)
app.use("/api/carts", cartsRouter)

app.use (express.json())

app.get('/', (req, res) => {
    res.render('home');
});

app.listen (8080, () => {
    console.log ( "Servidor escuchado en el puerto 8080" )
})

export {cartManagerr, products}
