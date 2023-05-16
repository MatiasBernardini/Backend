import { productsRepository } from "./products.repository.js";
import { productManager } from "../dao/factory.js";

import { cartsRepository } from "./cart.repository.js";
import { CartManager } from "../dao/factory.js";


export const productService = new productsRepository (productManager);
export const cartService = new cartsRepository (CartManager);