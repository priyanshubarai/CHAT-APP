const express = require("express");
const { signup, login, logout } = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.get("/signup",signup)

authRouter.get("/login",login)

authRouter.get("/logout",logout)
  
module.exports =  authRouter;