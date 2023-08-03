import { productService } from "./index.js"

export class cartsRepository{
    constructor (dao) {
        this.dao = dao
    }

    async addCart (){
        const newProductCart = await this.dao.addCart()

        return newProductCart
    }

    async getCart (cid) {
        let cart = await this.dao.getCartById(cid)

        return cart
    }

    async addProductInCart (product, cid, quantity) {
       await this.dao.addProductToCart(product, cid, quantity)

    } 

    async putQuantityUpdated (cid, pid, quantity){
        await this.dao.moreQuantity(cid, pid, quantity)
    }

    async deleteProductInCart (cid, pid){
        const prodToDel = await this.dao.deleteProductInCart(cid,pid);

        return prodToDel
    }

    async deletAllProductsInCart (cid) {
        await this.dao.removingAllProductsFromCart(cid)
    }
}