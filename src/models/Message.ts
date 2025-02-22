import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/types";
const messageSchema:Schema = new mongoose.Schema({
    sender :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{
        type:String,
        required:true
    },
    room:{type:mongoose.Schema.Types.ObjectId,ref:"Room"}
}, {timestamps : true })
const Message = mongoose.model<IMessage>('message',messageSchema)
export default Message