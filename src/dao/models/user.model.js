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

    avatar:{type:String, default:""},

    documents:{
        type:[
            {
                name:{type:String, required:true},
                reference:{type:String, required:true}
            }
        ],
        default:[]
    },

    status:{
        type:String,
        required:true,
        enums:["completo","incompleto","pendiente"],
        default:"pendiente"
    },

    last_connection:{
        type: Date, //new Date()
        default: null
    }
})


const userModel = mongoose.model("users", userSchema);

export default userModel;