import mongoose, { Schema } from "mongoose";
export interface IMessage extends Document{
    sender : mongoose.Schema.Types.ObjectId
    content:string,
    room: mongoose.Schema.Types.ObjectId
}
const messageSchema = new mongoose.Schema({
    sender :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{
        type:String,
        required:true
    },
    room:{type:mongoose.Schema.Types.ObjectId,ref:"Room"}
}, {timestamps : true })
const Message = mongoose.model<IMessage>('message',messageSchema)