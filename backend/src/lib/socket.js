import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin : process.env.NODE_ENV === "production" 
            ? [process.env.FRONTEND_URL || "https://your-frontend-domain.com"]
            : ["http://localhost:5173"],
        credentials: true
    }
});



const userSocketMap = {}; //{userId : socket.id}

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    //broadcast the new user about new online user
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("A user disconnected:",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})


export {io,app,server};