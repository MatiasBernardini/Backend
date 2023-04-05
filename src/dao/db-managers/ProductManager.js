import productsModel from "../models/product.model.js"

class dbProductManager {
  constructor () {
    console.log("Working with users using MongoDb");
  }

  titleOfProducts(str){
    const words = str.split("-")
    const wordsToUpperCase = words.map(w => w[0].toUpperCase() + w.slice(1))
    const newTitle = wordsToUpperCase.join(" ")
    return newTitle
  }

  async getProducts(limit, page, sortQ, query) {
    let newLimit = limit || 10;
    let newPage = page || 1;
    let sort = sortQ ? { price: sortQ } : false;

    let paginate = { limit: newLimit, page: newPage, sort: sort };
 
    let newQuery
    if (query.stock){
        newQuery = {
            stock: query.stock
        }
    } else if (query.stock){
        newQuery = {stock: query.stock}
    } else {
        newQuery = {}
    }

    const products = await productsModel.paginate(newQuery, paginate)

    return products
  }

  async addProduct ( product ){
    const products = await productsModel.create(product)

    return products
  }

  async getProductById(id){
    try{
        const product = await productsModel.findById(id)
        return product
    }catch(err){
        throw new Error(err)
    }
}

  async updateProduct(id, propModify){
    try{
        const result = await productsModel.findOneAndUpdate({_id: id}, propModify, {new: true})
        return result
    }catch(err){
        throw new Error(err)
    }
  }

  async deleteProduct(id){
    try{
        const result = await productsModel.deleteOne({_id: id})
        return result
    }catch(err){
        throw new Error(err)
    }
}
}

export default dbProductManager; 