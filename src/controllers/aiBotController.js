const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv').config();
const axios = require('axios');

const config = new Configuration({
	apiKey: process.env.AI_KEY,
});

const openai = new OpenAIApi(config);


async function continueConversation(prompt, messages,tokenSize) {
  
  console.log("current conversation list is "+JSON.stringify(messages));
  try {

    // model:"gpt-3.5-turbo",
    const response =await openai.createChatCompletion({
      model:"gpt-3.5-turbo",
      messages: messages,
      max_tokens:tokenSize
    });

    console.log("Current Ai answer is ", response.data.choices[0].message.content);
    //console.log("Current used token ", response.data.total_tokens);
    
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



const OpenAiChat = async (req,res) =>{

  var conversation=req.body.data;
  const tokenSize=req.body.tokenSize;

	const response = await continueConversation(req.body.question , conversation, tokenSize);


  console.log("current conversation list is "+JSON.stringify(conversation)+ " and token size is "+tokenSize);

  return res.status(200).json({success:true,message : response});


}


module.exports={OpenAiChat};


