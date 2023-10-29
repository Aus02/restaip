const jwt =require("jsonwebtoken");
const dotenv = require('dotenv').config();

const auth =(req,res,next)=>{
    console.log("calling auth function ");
    try{
        let token=req.headers.authorization;
        console.log("current request header is "+token);
        if(token){
            //token value is 
            token=token.split(" ")[1];
            let user=jwt.verify(token,process.env.SECRET_KEY);
            req.userId=user.id;
            console.log("requesting after setting userid user req is "+req);
        }else{
        
            return res.status(401).json({message:"Unauthorized User"});
        }
        console.log("requesting before calling next function req is "+req);
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({success:false,message:"Unauthorized User"});
    }
}

module.exports=auth;