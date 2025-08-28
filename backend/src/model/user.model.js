const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose")

const userSchema = new moongoose.Schema({
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

User = moongoose.model("User",userSchema);
module.exports = User;
