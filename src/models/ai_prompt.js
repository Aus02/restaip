const mongoose = require("mongoose");

const AiPromptSchema=mongoose.Schema({
    
  promptId:{
        type:String,
        unique: true,
        required:[true,"Please provide promptId"]
    },
    iconImageUrl:{
        type:String
    },
    title:{
        type:String,
        required:[true,"Please provide title"]
    },
    description:{
        type:String,
        required:[true,"Please provide description"]
    },
    prompt:{
        type:String,
        required:[true,"Please provide prompt"]
    },
    filter:{
        type:[String],
        required:[true,"Please provide filters"]
    },
    
    createdAt: {
        type: Date,
        default: Date.now
      },
      updateAt: {
        type: Date,
        default: Date.now
      },
    
},{timestamps:true}
);
NewsSchema.index({ promptId: 'text' });


module.exports=mongoose.model("AiPrompt",AiPromptSchema);