export const generateUserErrorInfo = (user)=>{
    return `
        Alguno de los campos para crear el usuario no es valido
        Lista de campos requeridos:
        first_name: debe ser un campo de tipo String, pero se recibio ${user.first_name},
        last_name: debe ser un campo de tipo String, pero se recibio ${user.last_name},
        age:debe ser un campo de tipo Number, pero se recibio ${user.age},
    `
}