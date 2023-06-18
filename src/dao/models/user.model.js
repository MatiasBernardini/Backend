import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,

    last_name: String,

    full_Name:{
        type:String,
        default:''
    },

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
        enum:["user","admin", "premium"],
        default: 'user',
    },

    cart:{
        type:[
            {
                cart:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts",
                },
            },
        ],
        default:[],
    },
})


const userModel = mongoose.model("users", userSchema);

export default userModel;