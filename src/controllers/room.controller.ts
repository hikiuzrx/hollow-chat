import mongoose from "mongoose";
import Room from "../model/Room";
import { IRoom } from "../model/Room";
import { RoomDTO, RoomType } from "../types/types";
import User, { IUser } from "../model/User";
export async function createRomm(room:RoomDTO){
    let type:RoomType
    const users:IUser[] = await  Promise.all(room.users.map(async (u: string ) =>{
        const user:IUser| null = await User.findById(u)
        if(!user){
            throw new NotFoundException("no user found with this ID","user")
        }
        return user
    }))

    switch(room.type){
        case "DM":
             type = RoomType.DM
            break;
        case "GROUPE CHAT":
            type = RoomType.GROUPE_CHAT
            room.name = room.name? room.name:users.map((user:IUser)=>user.username).join(" ")

        }
    const existingRoom :IRoom|null = await  Room.findOne({type,users:{
        $all :users
    }})
    if(existingRoom){
        throw new ConflictException("room already exists","room")
    }
    const newRoom:IRoom = await  Room.create(room) 
    return newRoom
}