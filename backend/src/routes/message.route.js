import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSidebar, getMessages, sendMessages } from "../controller/message.controller.js";

const messageRouter = express.Router();


messageRouter.get("/",(req,res,next)=>{
    res.status(200).json({message: "message router is running"})
    next()
})

messageRouter.get("/users",protectRoute,getUserForSidebar)

messageRouter.get("/:id",protectRoute,getMessages)

messageRouter.post("/send/:id",protectRoute,sendMessages)




export default messageRouter;