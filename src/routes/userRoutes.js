const express = require("express");
const myAuth=require("../middlewares/auth");
const { signup, signin,updateUserProfile,getUserProfile } = require("../controllers/userControllers");
const userRouter=express.Router();

userRouter.post("/signup/",signup);

userRouter.post("/signin/",signin);

userRouter.put("/profile/",myAuth,updateUserProfile);

userRouter.get("/profile/",myAuth,getUserProfile);

//userRouter.delete("/:id",myAuth,deleteAccount);

userRouter.get("/verify",(req,res)=>{
    res.send("Verification is done");
});

module.exports =  userRouter;