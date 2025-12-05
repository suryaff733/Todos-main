import mongoose from "mongoose";

export async function dbConnect(url){
    try{
        await mongoose.connect(url)
        console.log("DB connected")
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}