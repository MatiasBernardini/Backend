import { Router, json } from "express";
import { viewsController } from "../controller/views.controller.js";

const viewstRouter = Router ();

viewstRouter.use (json());

viewstRouter.get("/", viewsController.get_Home)

viewstRouter.get("/login", viewsController.get_Login)

viewstRouter.get("/signup", viewsController.get_Signup)

viewstRouter.get("/forgot-password", viewsController.get_Forgot)

viewstRouter.get("/reset-password", viewsController.get_ResetPass)

viewstRouter.get("/profile", viewsController.get_Profile)

viewstRouter.get( "/products",  viewsController.get_Products)

viewstRouter.get("/carts/:cid", viewsController.get_Cart_Id)

// viewstRouter.get("/real_time_products", async (req,res)=>{
//     const product = await products.getProducts()
//     res.render("real_time_products", {product})                
// })

export default viewstRouter;