const express = require("express")

const authRouter = express.Router();

authRouter.get("/signup",(req,res,next)=>{
    res.send("signup route")
    next();
})

authRouter.get("/login",(req,res,next)=>{
    res.send("login route")
    next();
})

authRouter.get("/logout",(req,res,next)=>{
    res.send("logout route")
    next();
})

module.exports =  authRouter;