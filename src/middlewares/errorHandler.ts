import { NextFunction,Request,Response } from "express";
import { BaseException } from "../config/exceptions";
export default async function errorHandler(req:Request,res:Response,next:NextFunction,err:BaseException){
    
}