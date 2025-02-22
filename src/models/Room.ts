import mongoose,{Schema} from "mongoose";
import {IRoom, RoomType,Id } from "../types/types";

const RoomSchema :Schema =new  mongoose.Schema({
    name :{
        type:String,
        required:false
    },
    type :{
        type:String,
        enum: Object.values(RoomType),
        required:false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming you have a User model
    }]
},{ timestamps : true  });
const Room = mongoose.model<IRoom>('Room', RoomSchema);
export default Room;