const express = require("express");
const userRouter = require("./userRoutes");
const aiRouter =require('./aiBot');
const allRoutes=express.Router();


allRoutes.use("/users",userRouter);
allRoutes.use("/ohP3nAa8i",aiRouter);



allRoutes.get("/",(req,res)=>{
    res.send("**********Current api version 1**********");
});

module.exports =  allRoutes;

