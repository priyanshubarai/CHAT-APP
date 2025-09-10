import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import dotenv from "dotenv";
import { connetDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";   // needed after deploy
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

dotenv.config();

app.use(express.json({ limit: '10mb' }));  // allow up to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
// app.use(express.json()) 
app.use("/",(req,res,next)=>{
    console.log(req.method,req.url);
    next();
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

//authentication
app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

//require after deploy
const __dirname = path.resolve()    
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname , ".../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
    connetDB();
})