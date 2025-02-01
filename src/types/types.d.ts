export type Message ={
    roomId:number,
    senderId:number,
    recieverId:number
    content:string
}
export type RoomDTO = Pick<IRoom,| "name" | "users">& {type :"DM"|"GROUPE CHAT"}
export enum  RoomType {
    DM = "DM",
    GROUPE_CHAT = "GROUPE CHAT"
}
export type RoomId = mongoose.Schema.Types.ObjectId