import productsModel from "../models/product.model.js"

class dbProductManager {
  constructor () {
    console.log("Working with users using MongoDb");
  }

  async getProducts(limit, page, sortQ, queryKey, queryParam) {
    let limitIn = limit || 10;
    let pageIn = page || 1;
    let sort = sortQ ? { price: sortQ } : false;
    let queryKeyIn = queryKey;
    let queryIn = queryParam;

    let options = { limit: limitIn, page: pageIn, sort: sort };

    let querySearch;
    if (queryKeyIn&&queryIn) {
      querySearch = {[queryKeyIn]:[queryIn]}
      options.limit = 5;
    } else {
      {};
    }

    const products = await productsModel.paginate(querySearch, options)

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