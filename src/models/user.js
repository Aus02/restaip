const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema=mongoose.Schema({
    
    username:{
        type:String,
        required:[true,"Please enter your username"]
    },
    avatar:{
        type:String,
    },
    userSubscribeTopic:[String],
    role: {
        type: String,
        enum: ["admin",  "user"],
        default: "user",
      },
      userId:{
        unique: true,
        type:String,
        required: [true, "Please provide  id"],
    },
    password:{
        type:String,
        required: [true, "Please enter your password"],
        select: false,
    },

    deviceToken:{
        type:String,
    },
    
    isAdmin:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    email:{
        type:String,
        unique: true,
        lowercase: true,
    },
    phoneNumber:{
        type:String,
    },
},{timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);