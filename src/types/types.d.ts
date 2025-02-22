import mongoose,{ Document ,ObjectId,Model} from "mongoose";
import { userSchema } from "../utils/DTOs";
import z from "zod"
export type UserDTO = z.infer<typeof userSchema>;
export type PublicUser = Omit<UserDTO,"password">
export enum RoomType {
    DM = "DM",
    GROUPE_CHAT = "GROUPE CHAT"
};
export interface IUserModel extends Model<IUser> {
    login(identifier: string, password: string): Promise<IUser>;
}
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
export type Id = ObjectId;