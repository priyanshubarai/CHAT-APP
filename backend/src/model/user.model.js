const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose")

const userSchema = moongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic : {
        type: String,
        dafault: ""
    }
},{timestamps : true}
);

exports.User = moongoose.model("User",userSchema);
