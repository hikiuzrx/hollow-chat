import redis from 'redis'
import mongoose from 'mongoose'
import { RoomId, RoomType } from '../types/types'
import Room, { IRoom } from '../model/Room'
import { RoomDTO } from '../types/types'
import { BaseException } from './exceptions'
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
subClient.on("message",()=>{
    
})
