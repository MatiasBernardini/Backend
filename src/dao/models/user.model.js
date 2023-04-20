import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
    rol: {
        type: String,
        required:true,
        enum:["user","admin"],
        default: 'user',
    }
})


const userModel = mongoose.model("users", userSchema);

export default userModel;