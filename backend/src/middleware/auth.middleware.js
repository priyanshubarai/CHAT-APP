const jwt = require("jsonwebtoken")
const User = require("../model/user.model")

//check for auth
exports.protectRoute = async (req,res,next) => {
    console.log("authetication router is running!")
    try{
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({message : "Unauthorised - no token Provided!"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded) return res.status(401).json({message : "Unauthorised - no token Provided!"});

        const user = await findById(decoded.userId).select("-password");   //deselect password

        if(!user) return res.status(401).json({message : "Unauthorised - no token Provided!"});

        req.user = user;    //in case if user info in needed by server


    }catch(err){
        console.log("error occured in auth")
        res.status(500).json({message: `internal error :  ${err.message}`})
    }
    next()
}