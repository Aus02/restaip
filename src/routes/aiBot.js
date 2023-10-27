const express = require("express");
const {OpenAiChat}=require("../controllers/aiBotController");
const aiRouter=express.Router();
const dotenv = require('dotenv');

dotenv.config();

/***********Version Control vr1 ******************** */

aiRouter.post("/"+process.env.PATH_KEY,myAuth,OpenAiChat);

module.exports=aiRouter;