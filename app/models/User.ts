import mongoose from "mongoose";

// Creating our user schema

const userSchema = new mongoose.Schema({
    'username': {
        type:String, required:true,unique:true,
    },
    'email': {
        type:String, required:true,unique:true
    },
    'password': {
        type:String, required:true,unique:false
    },
    'image': {
        type:String, required:false,unique:false
    }
})

const user = mongoose.models.User || mongoose.model("User",userSchema)

export default user