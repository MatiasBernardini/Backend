import { Router, json } from "express";
import { productsController } from "../controller/products.controller.js";
import { checkRole } from "../middlewares/checkRole.js";

const productRouter = Router ();

productRouter.use (json());

productRouter.get ("/", productsController.get_Products)

productRouter.get ("/mockingproducts", productsController.generate_Product_Faker)

productRouter.get ("/:id", productsController.get_Product_Id)

productRouter.post ("/", checkRole (["admin", "premium"]) ,productsController.add_Product)
 
productRouter.put("/:id", checkRole (["admin"]) ,productsController.update_Product)

productRouter.delete("/:id", checkRole (["admin", "premium"]) ,productsController.delete_Product)

export default productRouter; 