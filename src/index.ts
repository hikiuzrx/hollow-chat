import express,{ Express,Request,Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import http from 'http'
import { setUpWebSocketServer } from "./websoeckts";
import { NotFoundException,UnauthorizedException,ValidationException,ConflictException } from "./config/exceptions";

configDotenv()
const api :Express = express()
const server = http.createServer(api)
console.log(process.env.DB_CONNECTION_STRING)
mongoose.connect(process.env.DB_CONNECTION_STRING as string ,{dbName:"chat-app",timeoutMS:3000}).then(()=>{
    api.listen(process.env.PORT || 8000 ,()=> console.log("hello it's connected to db & working  on this port = "+ process.env.PORT))
})
api.use(express.json())
api.use(cookieParser())// src/types/global.d.ts

api.get('/',()=> console.log('working'))
setUpWebSocketServer(server) 