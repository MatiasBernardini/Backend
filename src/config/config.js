import dotenv from "dotenv"

dotenv.config ();

const PORT = process.env.PORT;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PERSISTENCE= process.env.PERSISTENCE
const NODE_ENV = process.env.NODE_ENV
const SECRET_SESSION = process.env.SECRET_SESSION
const SECRET_TOKEN = process.env.SECRET_TOKEN
const CREATOR_EMAIL = process.env.CREATOR_EMAIL
const CREATOR_EMAIL_PASSWORD = process.env.CREATOR_EMAIL_PASSWORD


export const options = {
    server:{
        port:PORT,
        persistence: PERSISTENCE,
        nodeEnv: NODE_ENV,
        secretSession: SECRET_SESSION
    },
    mongo:{
        url:`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@proyectobackend.jitxkya.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`
    },
    auth:{
        account: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD
    },
    gmail: {
        emailToken: SECRET_TOKEN,
        emailCreator: CREATOR_EMAIL,
        emailPass: CREATOR_EMAIL_PASSWORD
    }
}