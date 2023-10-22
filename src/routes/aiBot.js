const express = require("express");
const {OpenAiChat}=require("../controllers/aiBotController");
const aiRouter=express.Router();
const dotenv = require('dotenv');

dotenv.config();

/***********Version Control vr1 ******************** */

aiRouter.get("/"+process.env.PATH_KEY,OpenAiChat);

module.exports=aiRouter;