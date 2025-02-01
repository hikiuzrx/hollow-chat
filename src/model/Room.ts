import { Schema ,Document} from "mongoose";
import mongoose from "mongoose";
import { RoomType } from "../types/types";

export interface IRoom extends Document{
    name?:string,
    type :RoomType
    users:mongoose.Schema.Types.ObjectId[]
}
const roomSchema:Schema = new mongoose.Schema({
    name:{
        type:String,
        requried:false,
    },
    type :{
        type : RoomType,
        required:true
    },
    users:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
  
}, { timestamps:true });
const Room =  mongoose.model<IRoom>('room',roomSchema)
export default Room