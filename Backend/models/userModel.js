import mongoose, { Types } from "mongoose";
import express from "express"

const userModel= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
        
    }
})

export default mongoose.model("USer",userModel);