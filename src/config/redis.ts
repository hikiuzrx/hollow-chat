import redis from 'redis'
import { Id, RoomType,IUser,IRoom,IMessage } from '../types/types'
import Room from "../models/Room"
import { BaseException } from './exceptions'
import Message from "../models/Message"
import User from "../models/User"

const pubClient = redis.createClient()
const subClient = redis.createClient()
pubClient.on("error",(err)=> console.error(err.message))
subClient.on("error",(err)=> console.error(err.message))

export async function subscribe(roomId:Id){
    const room:IRoom|null = await Room.findById(roomId)
    if(!room){
        throw new NotFoundException("no room found with this id","Room")
    }
    subClient.subscribe(JSON.stringify(room._id),(err:any)=>{
        if(err){
            throw new InternalServerException("error subscribing to the room","redis")
        }else{
            console.log(`subscribed to the room with the id : ${room._id}`)
        }
    })
}
export async function publish(message:IMessage) {
    const sender :IUser |null = await User.findById(message.sender)
    if(!sender){
        throw new NotFoundException("no user is found with this id","user")
    }
    const newMessage :IMessage|null = await Message.create(message)
    if(!newMessage){
        throw new InternalServerException("error saving the message to the db")
    }
    pubClient.publish(JSON.stringify(newMessage.room),JSON.stringify(newMessage)) 
}
export  {subClient,pubClient}