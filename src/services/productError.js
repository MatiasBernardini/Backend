export const generateProductErrorInfo = (product)=>{
    return `
        Alguno de los campos para crear el producto no es valido
        Lista de campos requeridos:
        title: debe ser un campo de tipo String, pero se recibio ${product.title},
        description: debe ser un campo de tipo String, pero se recibio ${product.description},
        price:debe ser un campo de tipo Number, pero se recibio ${product.price},
        code:debe ser un campo de tipo Number, pero se recibio ${product.code},
        stock:debe ser un campo de tipo Number, pero se recibio ${product.stock},
    `
};

export const generateProductErrorParam = (id)=>{
    return `
        el id del producto es incorrecto o debe ser un valor numerico, pero se recibio ${id}
    `
};

export const updateProductErrorInfo = (product)=>{
    return `
        Alguno de los campos para actualizar el producto no es valido
        Lista de campos requeridos:
        title: debe ser un campo de tipo String, pero se recibio ${product.title},
        description: debe ser un campo de tipo String, pero se recibio ${product.description},
        price:debe ser un campo de tipo Number, pero se recibio ${product.price},
        code:debe ser un campo de tipo Number, pero se recibio ${product.code},
        stock:debe ser un campo de tipo Number, pero se recibio ${product.stock},
    `
};