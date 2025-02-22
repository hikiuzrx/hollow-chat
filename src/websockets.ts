import { Socket, Server } from "socket.io";

const ioServer = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log("A user connected");
        console.log(socket.id);

        socket.on("message", (message) => {
            console.log(message);
            console.log(typeof message);
            io.emit("response",`message from ${socket.id} here is the content ${message}`);
           
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};

export { ioServer };