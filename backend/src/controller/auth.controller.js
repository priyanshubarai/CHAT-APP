const { generateToken } = require("../lib/utils");
const { User } = require("../model/user.model");
const bcrypt = require("bcryptjs")

exports.signup =  async (req,res,next)=>{
    console.log("signup controller running")
    try{
        const {fullName,email,password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({message : "all Fields is required"});
        }
        if(password.length<6){
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

exports.login = async (req,res,next)=>{
console.log("login route running")
    try{
        const {email,password} = req.body;

        //check user existence in DB
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : `Invalid Credentials`});

        //check password
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Credentials"});

        //generate token
        generateToken(user._id,res)
        res.status(200).json({
            message: "Succeessfull login!",
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic       
        })

    }catch(err){
        console.log("Error in login controller",err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
    next();
}

exports.logout = (req,res,next)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(err){
        console.log("error while logging out",err.message)
    }
    next();
}

exports.updateProfile = (req,res,next) => {
    
    next()
}

