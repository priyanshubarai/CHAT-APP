const User = require("../model/user.model")
const Message = require("../model/message.model")
const cloudinay = require("cloudinary").v2
const mongoose = require("mongoose");
const { io } = require("../lib/socket");


exports.getUserForSidebar = async (req,res,next)=>{
    console.log("get user middleware from backend!")
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password")  //find other users except ourself and excludes password

        res.status(200).json(filteredUsers)

    }catch(err){
        console.log("error in getUserForSidebar",err.message);
        res.status(500).json({message: "Internal Server Error!"})
    }
}

exports.getMessages = async (req,res,next) => {
    try{
        const userToChatId = req.params.id;
        const myId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
             return res.status(400).json({ message: "Invalid user ID" });
        }

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId},
            ]
        })

        res.status(200).json(messages);

    }catch(err){
        console.log("error in getMessages",err.message);
        res.status(500).json({message: "Internal Server Error!"})
    }
}

exports.sendMessages = async(req,res,next) => {
    console.log("Send Message middleware running:")
    try {
        const {text , image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinay.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();
        console.log("message saved successfully")

        // Emit the new message

        io.emit("newMessage", newMessage);
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in sendMessage",error.message);
        res.status(500).json({message: "Internal Server Error!"})
    }
}