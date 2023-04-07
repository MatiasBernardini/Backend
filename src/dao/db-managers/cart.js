import cartModel from "../models/cart.model.js"

class dbCartManager {
    constructor () {
        console.log("Working with users using DB");
    }

    async getCart() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async addCart (){
      const cart = {
          products: []
      }
      const result = await cartModel.create(cart)
      return result
    }

    async getCartById(newId) {
      const carts = await cartModel.findById(newId)
      return carts
    }

    async getCartProducts(id) {
      try {
          const cart = await cartModel.findById(id).populate("products.product").lean()
          return cart
      } catch (err) {
          throw new Error(err)
      }
    }
  
    async addProductToCart(prod, cartID){
      const cart = await cartModel.findById(cartID)

      const product = cart.products.find(elem => elem.title === prod.title)

      if(product){
          product.quantity += 1
          await cart.save()
      } else {
          cart.products.push({product: prod._id, title: prod.title})
          await cart.save()
      }
    }

    async moreQuantity(cartID, productID, quantity) {
      const cart = await cartModel.findById(cartID)
      const product = cart.products.find(elem => elem.product.toString() === productID)

      if (!cart) {
          throw new Error("No existe carrito con ese id.")
      }

      if (product) {
          product.quantity += quantity
          await cart.save()
          await cart.populate("products.product")
          console.log(JSON.stringify(cart, null, "\t"))
      } else {
          cart.products.push({ product: productID })
          await cart.save()
          const newProduct = cart.products.find(elem => elem.product.toString() === productID)
          newProduct.quantity = quantity
          await cart.save()
          await cart.populate("products.product")
          console.log(JSON.stringify(cart, null, "\t"))
      }
    }

    async deleteProductInCart(cid, pid){
      let prodDeleted = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return prodDeleted;
    }

    async removingAllProductsFromCart (cartId){
      const cart = await cartModel.updateOne(
        { _id: cartId },
        { $pull: { products: {} } }
      );
      return cart;
    }

}

export default dbCartManager