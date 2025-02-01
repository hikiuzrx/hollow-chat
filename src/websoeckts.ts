import {Server, Socket } from "socket.io";
import { Message } from "./types/types";
export function setUpWebSocketServer(server:any){
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]

        }
    })
    io.on("connection",(socket:Socket)=>{
        console.log("connection is established on port 8000")
        socket.on("message",(message:Message)=>{
            console.log(message)
            console.log(typeof message)
            socket.emit(`message from ${message.senderId} to ${message.roomId}`);
            console.log("message delivered")
        })
        socket.on("disconnect",()=>{
            console.log("disconnection")
        })
    })
}
