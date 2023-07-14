import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bcrypt from "bcrypt";
import { Faker, es, en } from "@faker-js/faker";
import jwt from "jsonwebtoken"
import { options } from "./config/config.js"
import multer from "multer";

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


/* generar un token */

export const generateEmailToken = (email,expireTime)=>{
    const token = jwt.sign({email},options.gmail.emailToken,{expiresIn:expireTime});
    return token;
};

export const verifyEmailToken = (token)=>{
    try {
        const info = jwt.verify(token,options.gmail.emailToken);
        return info.email;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};


/* Multer */
const validFields = (body)=>{
    console.log ("body", body)
    const {first_name, last_name, email, age, password} = body;
    if(!first_name || !last_name || !email || !age || !password){
        return false;
    } else {
        return true
    }
};

const multerFilterProfile = (req,file,cb)=>{
    const isValid = validFields(req.body);
    if(!isValid){
        cb(null, false)
    } else {
        cb(null, true)
    }
};

/* Multer Profile */
const profileStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/images"))
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
});

export const uploaderProfile = multer({storage:profileStorage, fileFilter: multerFilterProfile});

/* Multer Documents */
const documentStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/documents"))
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
});

export const uploaderDocument = multer({storage:documentStorage});

/* Multer images Products */
const productStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/products/images"))
    },
    //que nombre tendra el archivo que guardamos
    filename: function(req,file,cb){
        cb(null,`${req.body.code}-imagen-${file.originalname}`)
    }
});
export const uploaderProduct = multer({storage:productStorage});


export default __dirname;