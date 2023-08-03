import { Router, json } from "express";
import { viewsController } from "../controller/views.controller.js";
import { dbProductManager } from "../dao/db-managers/ProductManager.js";

const productManeger = new dbProductManager ();
const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get("/", viewsController.get_Home)

viewstRouter.get("/login", viewsController.get_Login)

viewstRouter.get("/signup", viewsController.get_Signup)

viewstRouter.get("/forgot-password", viewsController.get_Forgot)

viewstRouter.get("/reset-password", viewsController.get_ResetPass)

viewstRouter.get("/profile", viewsController.get_Profile)

viewstRouter.get( "/real_time_products",  viewsController.get_Products)

viewstRouter.get("/products/:pid", viewsController.get_specificProduct )

viewstRouter.get("/carts/:cid", viewsController.get_Cart_Id)

viewstRouter.get ("/get-users", viewsController.get_Users )

viewstRouter.get ("/get-users-specific/:uid", viewsController.get_SpecificUsers )

viewstRouter.get("/purchase", viewsController.get_Purchase)

export default viewstRouter;