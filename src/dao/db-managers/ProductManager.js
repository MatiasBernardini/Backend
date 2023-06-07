import productsModel from "../models/product.model.js"
import { addLogger } from "../../utils/logger.js";

const logger = addLogger ();


class dbProductManager {
  constructor () {
    logger.info("Working with users using Db (ProductManager)");
  }

  async getProducts(limit, page, sortQ, query) {
    let newLimit = limit || 10;
    let newPage = page || 1;
    let sort = sortQ ? { price: sortQ } : false;

    let paginate = { limit: newLimit, page: newPage, sort: sort };
 
    let newQuery
    // if (query.stock){
    //     newQuery = {
    //         stock: query.stock
    //     }
    // } else if (query.stock){
    //     newQuery = {stock: query.stock}
    // } else {
    //     newQuery = {}
    // }   FIJARSE QUE ESTO ME ESTA DANDO ERROR AL ACTUALIZAR Y BORRAR PRODUCTOS

    const products = await productsModel.paginate(newQuery, paginate)

    return products
  }

  async addProduct (title, description, price, code, stock) {
    code = Math.floor(Math.random() * 100000000000)

    try {
        const product = {
            title,
            description,
            price,
            code,
            stock
        }
        const result = await productsModel.create(product)
        return result
    } catch (err) {
        throw new Error(err.message)  
    }
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

async updateQuantityDb(id, stock){
  try{
      const result = await productsModel.findOneAndUpdate({_id: id}, {stock: stock}, {new: true})
      return result
  }catch(err){
      throw new Error(err)
  }
}
}

export  {dbProductManager}; 