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

    async addArrayToCart (cartId, arr){
      let test = await this.getCart(cartId);

      console.log(test);

      let addArr = await cartModel.updateOne(
        { _id: cartId },
        { $push: { products: { $each: arr } } }
      );

      console.log(addArr);

      return addArr;
    }

    // async addProductToCart3(cartId, productId, quanty) {
    //   try {
    //     const findProduct = await cartModel
    //       .findById(cartId)
    //       .populate("products.product");
  
    //     const existingProductIndex = findProduct.products.findIndex(
    //       (p) => p.product._id.toString() === productId
    //     );
    //     let quantyToAdd = quanty ? quanty : 1;
    //     if (existingProductIndex !== -1) {
    //       findProduct.products[existingProductIndex].quantity += Number(quantyToAdd);
    //     } else {
    //       findProduct.products.push({ product: productId, quantity: quantyToAdd });
    //     }
  
    //     return await findProduct.save();
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // }

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