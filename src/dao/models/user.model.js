import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,

    last_name: String,

    age: Number,

    email:{
        type: String,
        unique: true,
        required:true,
    },
  
    password: {
        type: String,
        required:true,
    },
    
    rol: {
        type: String,
        required:true,
        enum:["user","admin"],
        default: 'user',
    }
})


const userModel = mongoose.model("users", userSchema);

export default userModel;