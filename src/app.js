import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.json({limit:"20kb"}))
app.use(cookieParser())

import  cryptoRoute  from "./routes/crypto.routes.js"
app.use("/api/crypto",cryptoRoute)


export { app }