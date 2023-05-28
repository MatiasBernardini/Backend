import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { Faker, es, en } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const isValidPassword = (user,loginPassword) => {
    return bcrypt.compareSync(loginPassword,user.password);
}


/* generar un poducto mediante Faker */

export const customFaker = new Faker({
    locale: [en],
});

const { commerce, database, string} = customFaker;

export const generateProductFaker = () => {
    return {
        _id: database.mongodbObjectId(), 

        title: commerce.productName(),
    
        description: commerce.productDescription(),
    
        price: parseFloat (commerce.price()),
    
        code: parseInt (string.numeric(10)),
    
        stock: parseInt (string.numeric(2))
    }
};


export default __dirname;