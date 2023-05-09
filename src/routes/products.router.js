import { Router, json } from "express";
import { productsController } from "../controller/products.controller.js";

const productRouter = Router ();

productRouter.use (json());

productRouter.get ("/", productsController.get_Products)

productRouter.get ("/:id", productsController.get_Product_Id)

productRouter.post ("/", productsController.add_Product)
 
productRouter.put("/:id", productsController.update_Product)

productRouter.delete("/:id", productsController.delete_Product)

export default productRouter; 