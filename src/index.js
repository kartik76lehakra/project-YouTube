import dotenv from 'dotenv'


import { app } from './app.js';
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";  
import connectDB from "./db/index.js"

dotenv.config({ path: './env' })

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{

console.log(`server is running on ${process.env.PORT}`)

    })
}

)
.catch((err)=>{
console.log("mongodb connection fail", err)
})































































/*  

For connecting using IFI (immediately invoked functions)
and using try and catch methode

But this code make the index file heavy so we dont use that approch


import express from "express";
const app = express()

;(async ()=>{

try {

    await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
    app.on("error",(errror)=>{
        console.log("ERRR:",error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log('app is running on port ${process.env.PORT}');
    })
    
} catch (error) {

    console.error("ERROR: ",error)
    throw err
}

})()

*/
