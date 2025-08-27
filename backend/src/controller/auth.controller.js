const { generateToken } = require("../lib/utils");
const { User } = require("../model/user.model");
const bcrypt = require("bcryptjs")

exports.signup =  async (req,res,next)=>{
    console.log("signup controller running")
    console.log(req.body)
    try{
        const {fullName,email,password} = req.body;
        if(password<6){
            return res.status(400).json({message : "Password must be atleast 6 characters"});
        }

        //checking existing user
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email Already exist"});

        //hasing new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            //generate JWT token
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({message: "Invalid user data"})
        }
    }catch(err){
        console.log(`error in signup controller : ${err}`)
        res.status(500).json({message: "internal server error"})
    }
    next();
}

exports.login = (req,res,next)=>{
    res.send("login route")
    next();
}

exports.logout = (req,res,next)=>{
    res.send("logout route")
    next();
}
