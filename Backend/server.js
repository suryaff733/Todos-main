import express from "express"
import  "dotenv/config"
import cors from "cors"
import { dbConnect } from "./config/db.js"
import router from "./routes/route.js"



const app = express()

const url = process.env.MONGO_URL


app.use(cors())
app.use(express.json())
app.use("/api/user",router)

if(!url){
    console.log("Invalid url");
    process.exit(1);
}

const initDB= async()=>{
    try{
        await dbConnect(url);
        app.listen(5005,()=>{
            console.log("Server Started")
        })
        
    }catch(err){
        console.log(err)
        process.exit(1);

    }}
initDB()
