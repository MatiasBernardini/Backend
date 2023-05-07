import express from "express"
import { engine } from 'express-handlebars';
import { options } from "./config/config.js";
import __dirname from "./utils.js"
import { Server } from "socket.io";
import mongoose from 'mongoose';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";

import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.routes.js";
import viewstRouter from "./routes/views.routes.js";
import authRouter from "./routes/auth.routes.js";

/* ---------------------------------------------------------- */

const app = express()

const port = options.server.port;
const mongoUrlSecret = options.mongo.url

app.use (express.json())
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/../public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

mongoose.connect(mongoUrlSecret).then((conn) => {
    console.log("Connected to DB!");
});  

app.use (session({
    store: MongoStore.create({
        mongoUrl: mongoUrlSecret,
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true
}))

initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

const httpServer = app.listen (port, () => {
    console.log ( `Server listening on port ${port}` )
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
app.use ("/api/sessions", authRouter)
