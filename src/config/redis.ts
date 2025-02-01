import redis from 'redis'
import { RoomId, RoomType } from '../types/types'
import Room, { IRoom } from '../model/Room'
import { BaseException } from './exceptions'
import Message, { IMessage } from '../model/Message'
import User, { IUser } from '../model/User'
import { NodeModuleEmitKind } from 'ts-node'
const pubClient = redis.createClient()
const subClient = redis.createClient()
pubClient.on("error",(err)=> console.error(err.message))
subClient.on("error",(err)=> console.error(err.message))

export async function subscribe(roomId:RoomId){
    const room:IRoom|null = await Room.findById(roomId)
    if(!room){
        throw new NotFoundException("no room found with this id","Room")
    }
    subClient.subscribe(JSON.stringify(room._id),(err:any)=>{
        if(err){
            throw new BaseException(err.message,"redis",500)
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
        throw new Error("error saving the message to the db")
    }
    pubClient.publish(JSON.stringify(newMessage.room),JSON.stringify(newMessage)) 
}
export  {subClient,pubClient}