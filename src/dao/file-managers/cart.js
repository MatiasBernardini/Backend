import fs from "fs" 
import __dirname from "../../utils.js"
import { addLogger } from "../../utils/logger.js";

const path = __dirname + "/dao/file-managers/files/Cart.json";
const logger = addLogger (); 

class cartManager {
    constructor () {
        logger.info("Working with users using filesystem");
    }

    async getCart() {
        try {
          const carts = await fs.promises.readFile(path, "utf-8");
          return JSON.parse(carts);
        } catch (e) {
          return [];
        }
    }

    async getIDs(){
        let carts = await this.getCart()

        let ids = carts.map( prods => prods.id)

        let mayorID = Math.max(...ids)
        if (mayorID === -Infinity) {
            return 0
        } else {
            return mayorID
        }
    }

    async addCart (){
        let carts = await this.getCart();

        let id = await this.getIDs()

        const dataCart = {
            id: ++id,
            products: []
        }

        const updateCart = [...carts , dataCart];

        await fs.promises.writeFile (path, JSON.stringify(updateCart));
    }

    async getCartById (newId){
        let carts = await this.getCart ();

        const idFilter = carts.find ((c)=>{
            return c.id === newId;
         });
         if (idFilter){
            return idFilter
        } else {  
            return "ID no encontrado"
        }
    } 

    async addProductToCart(prod, cartID){
        const carts = await this.getCart()
        const cart = await this.getCartById(cartID)

        let prodInCart = cart.products.find( p => p.id === prod.id)

        if (prodInCart){
            prodInCart.quantity += 1
            let filterProducts = cart.products.filter( p => p.id !== prodInCart.id) 
            filterProducts = [
                ...filterProducts,
                prodInCart
            ]
            cart.products = filterProducts
            let newCarts = carts.filter( c => c.id !== cartID)
            newCarts = [
                ...newCarts,
                cart
            ]
            await fs.promises.writeFile(path, JSON.stringify(newCarts))
        } else {
            cart.products = [
                ...cart.products,
                {
                    id: prod.id,
                    quantity: 1
                }
            ]
            let newCarts = carts.filter( c => c.id !== cartID)
            newCarts = [
                ...newCarts,
                cart
            ]
            await fs.promises.writeFile(path, JSON.stringify(newCarts))
        }
    }

}

export  {cartManager}