import express,{ Express,Request,Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { configDotenv } from "dotenv";

configDotenv()
const api :Express = express()
api.listen(process.env.PORT || 3000 ,()=> console.log("hello it's working on this port = "+ process.env.PORT))
api.use(express.json())
api.use(cookieParser()) 