import fs from "fs" 
import __dirname from "../../utils.js"

const path = __dirname + "/dao/file-managers/files/Product.json";

class ProductManager {

    constructor () {
        console.log("Working with users using filesystem");
    }

    async getProducts() {
        try {
          const products = await fs.promises.readFile(path, "utf-8");
          return JSON.parse(products);
        } catch (e) {
          return [];
        }
    }

    async getIDs(){
        let products = await this.getProducts()

        let ids = products.map( prods => prods.id)

        let mayorID = Math.max(...ids)
        if (mayorID === -Infinity) {
            return 0
        } else {
            return mayorID
        }
    }

    async addProduct ( {title, description, price, code, stock} ){
        let productos = await this.getProducts();

        let mayorID = await this.getIDs()

        let repeatedCode = await productos.find ((p)=>{
           return p.code === code;
        });
        
        if (repeatedCode){
            throw new Error ("Este Producto, ya ha sido seleccionado")
        }

        if (!title || !description || !price || !code || !stock){
            throw new Error ("Falta completar");
        }

        const dataProduct = {
            id : ++mayorID,
            title,
            description,
            price,
            code,
            stock
        }

        const products = await this.getProducts ();

        const updateProduct = [...products , dataProduct];

        await fs.promises.writeFile (path, JSON.stringify(updateProduct));
    }

    async getProductById (newId){
        let productos = await this.getProducts ();

        const idFilter = productos.find ((p)=>{
            return p.id === newId;
         });
         if (idFilter){
            return idFilter
        } else {  
            return "ID no encontrado"
        }
    } 

    async updateProduct (id, data){
        let products = await this.getProducts()
        let productoModificado = products.find(i => i.id === id)

        if (Object.keys(data).includes('id')){
            throw new Error('ID UNICO')
        }
        
        productoModificado = {...productoModificado, ...data};

        let newArray = products.filter( prods => prods.id !== id);

        newArray = [...newArray, productoModificado];

        await fs.promises.writeFile(path, JSON.stringify(newArray));

        console.log('Modificación exitosa')
    }


    async deleteProduct(id){
        let products = await this.getProducts();

        let eliminarProducto = products.filter(p => p.id !== id);

        await fs.promises.writeFile(path,JSON.stringify(eliminarProducto));

        console.log("Producto eliminado de JSON")
    }
}

export  {ProductManager}; 