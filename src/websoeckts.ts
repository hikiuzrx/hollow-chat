import WebSocket, { WebSocketServer } from "ws";
export function setUpWebSocketServer(server :any):void{
    const ws  =new WebSocketServer({ server })
    ws.on("connection",(socket)=> {
        console.log('connection established')
    })
    ws.on("message",(message)=> {
        console.log(message)
    })
    ws.on("close",()=>{
        console.log("client disconnected")
    })
}