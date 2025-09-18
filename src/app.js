import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//app.use() is used for config, and middlewares
//we get data in many forms ie json, direct so we have to setup that
//this way we can data in json form 
app.use(express.json({limit: "20kb"}))

// this way we can get data in URL 
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))

//if we get data in PDF or file form we can put in the local server
app.use(express.static("public"))

//How to setup cookie parser

app.use(cookieParser())

export { app }