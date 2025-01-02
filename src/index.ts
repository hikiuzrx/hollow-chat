import express,{ Express,Request,Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import http from 'http'
import { setUpWebSocketServer } from "./websoeckts";
configDotenv()
const api :Express = express()
const server = http.createServer(api)
mongoose.connect(process.env.DB_CONNECTION_STRING as string ,{dbName:"chat-app"}).then(()=>{
    api.listen(process.env.PORT || 3000 ,()=> console.log("hello it's connected to db & working  on this port = "+ process.env.PORT))
})
api.use(express.json())
api.use(cookieParser())
api.get('/',()=> console.log('working'))
setUpWebSocketServer(server) 