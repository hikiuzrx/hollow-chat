import User from "../models/User";
import Room from "../models/Room";
import Message from "../models/Message";
import { IUser ,Id, IRoom , AuthenticatedRequest, IMessage } from "../types/types"
import { Response , NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
export async function getRooms(req:AuthenticatedRequest,res:Response,next:NextFunction){
    try{
        const userId = req.user?._id
        const rooms:IRoom[]|null = await Room.find({ users: userId as Id })
        .populate({
            path:"users",
            select:"-password"
        })
        if(rooms.length ===0){
            const accessToken = generateAccessToken(userId as string)
            const refreshToken = generateRefreshToken(userId as string)
            res.setHeader("Authorization", `Bearer ${accessToken}`);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                secure: process.env.NODE_ENV === "production",
            });
            res.status(200).json({rooms:[]})
        }
        const accessToken = generateAccessToken(userId as string)
        const refreshToken = generateRefreshToken(userId as string)
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({rooms})

    }catch(error){
        next(error)
    }
}
export async function getChatHistory(req:AuthenticatedRequest,res:Response,next:NextFunction){
    try {
        const userId = req.user?._id 
        const {id:roomId } = req.params
        const room:IRoom|null = await Room.findById({roomId})
        if(!room){
            throw new NotFoundException("no room with this Id sus source","room")
        }
        const messages:IMessage[]|null = await Message.find({room:room._id}).populate({
            path:"sender",
            select:"profilePic username"
        })
        if(messages.length ===0){
            const accessToken = generateAccessToken(userId as string )
            const refreshToken = generateRefreshToken(userId as string)
            res.setHeader("Authorization", `Bearer ${accessToken}`);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                secure: process.env.NODE_ENV === "production",
            });
            res.status(200).json({messages:[]})
        }
        const accessToken = generateAccessToken(userId as string )
        const refreshToken = generateRefreshToken(userId as string)
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({messages})

    } catch (error) {
        next(error)
    }
}