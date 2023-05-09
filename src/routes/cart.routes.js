import { Router ,json } from "express";
import { cartController } from "../controller/carts.controller.js";

let cartsRouter = Router()
cartsRouter.use(json())

cartsRouter.post("/", cartController.add_Cart)

cartsRouter.get("/:cid", cartController.get_Cart)

cartsRouter.post("/:cid/products/:pid", cartController.add_ProductInCart)

cartsRouter.put("/:cid", cartController.add_ArrayToCart)

cartsRouter.put("/:cid/products/:pid", cartController.put_QuantityUpdated)

cartsRouter.delete("/:cid/products/:pid", cartController.delete_ProductInCart)

cartsRouter.delete("/:cid", cartController.delet_AllProductsInCart)

export default cartsRouter