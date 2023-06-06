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

export const options = {
    server:{
        port:PORT,
        persistence: PERSISTENCE,
        nodeEnv: NODE_ENV
    },
    mongo:{
        url:`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@proyectobackend.jitxkya.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`
    },
    auth:{
        account: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD
    }
}