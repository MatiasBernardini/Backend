export class productsRepository{
    constructor (dao) {
        this.dao = dao
    }

    async getProduct (limit, page, sort, query) {    
        const product = await this.dao.getProducts(limit, page, sort, query);

        return product
    }

    async getPaginateProductsRepository(query={},options={}){
        const result = await this.dao.getPaginateProducts(query,options);
        return result;
    };

    async getProductById (id) {
        const product = await this.dao.getProductById(id)

        return product
    }

    async addProduct (title, description, price, code, stock, owner) {
        const product = await this.dao.addProduct(title, description, parseInt(price), code, parseInt(stock), owner)

        return product
    }

    async updateProduct (id, product){
        await this.dao.updateProduct(id, product)

        const productEmit = await this.dao.getProducts()

        return productEmit
    }

    async deleteProduct (id) {
        await this.dao.deleteProduct(id)

        const product = await this.dao.getProducts()

        return product
    }

    async updateQuantity (id, stock){
        await this.dao.updateQuantityDb(id, stock)

        const productEmit = await this.dao.getProducts()

        return productEmit
    }
}