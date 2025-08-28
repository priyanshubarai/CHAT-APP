const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const { getUserForSidebar, getMessages, sendMessages } = require("../controller/message.controller");

messageRouter = express.Router();


messageRouter.get("",(req,res,next)=>{
    res.status(200).json({message: "message router is running"})
    next()
})

messageRouter.get("/users",protectRoute,getUserForSidebar)
messageRouter.get("/:id",protectRoute,getMessages)
messageRouter.get("/send/:id",protectRoute,sendMessages)




module.exports = messageRouter;