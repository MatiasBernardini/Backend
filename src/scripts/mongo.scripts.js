import mongoose from "mongoose";
import productsModel from "../dao/models/product.model.js";
import { connectDb } from "../config/dbConnection.js";

connectDb ();

const updateProducts = async()=>{
    try {
        const adminId = "648f669e0bb510f13dc65308";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
}
updateProducts();
