import mongoose from "mongoose";
import { options } from "./config.js";

export const connectDb = async () => {
    try {
        await mongoose.connect (options.mongo.url)
    } catch (error) {
        console.log (`Hay un problema al conectarse a la DB, ${error.message}`)
    }
}