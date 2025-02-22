import mongoose,{ Document } from "mongoose";


export enum RoomType {
    DM = "DM",
    GROUPE_CHAT = "GROUPE CHAT"
};
export interface IRoom extends Document{
    name?:string,
    type :RoomType
    users:mongoose.Schema.Types.ObjectId[]
}
export interface IMessage extends Document{
    sender : mongoose.Schema.Types.ObjectId
    content:string,
    room: mongoose.Schema.Types.ObjectId
}
export interface IUser extends Document{
    email:string,
    fullName:string,
    username:string,
    password:string
}
export type Id = mongoose.Schema.Types.ObjectId;