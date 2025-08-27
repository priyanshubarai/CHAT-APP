const express = require("express");
const { signup, login, logout, updateProfile, checkAuth } = require("../controller/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.put("/update-profile",protectRoute ,updateProfile)
authRouter.get("/check",protectRoute ,checkAuth) // to check auth when page in refereshed

  
module.exports =  authRouter;