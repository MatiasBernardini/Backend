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
      const cart = await cartModel.findById(newId)
      return cart
    }
  
    async addProductToCart(prod, cartID){
      try{
          const cart = await cartModel.findById(cartID)
          const product = cart.products.find(elem => elem.title === prod.title)
          if(product){
              product.quantity += 1
              await cart.save()
          } else {
              cart.products.push({product: prod._id, title: prod.title})
              await cart.save()
          }
          
          console.log(cart)

  
          // No pude hacerlo con populate

          // const cart = await cartModel.findById(cartID)
          // cart.products.push({product: productID})
          // await cart.save()
          // await cart.populate("products.product")
          // console.log(JSON.stringify(cart, null, "\t"))

      }catch(err){
          throw new Error(err)
      }
    }

}

export default dbCartManager