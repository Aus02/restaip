const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

dotenv.config();
//console.log("current dotenv initialize "+process.env.MONGO_URL);

app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log("HTTPS METHOD = "+req.method);
    next();
});

app.use("/api/v1",apiRoutes);

const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server Started on port no "+PORT);
    });
}).catch((errorr)=>{
    console.log(errorr);
});

app.get("/",(req,res)=>{
    res.send("**********Bharat Api Demo --Developed by Ankitraj Dwivedi**********");
});