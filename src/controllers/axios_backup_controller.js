const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv').config();
const axios = require('axios');
const axiosRetry = require('axios-retry');

const config = new Configuration({
	apiKey: process.env.AI_KEY,
});

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',

  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+process.env.AI_KEY
  },
  // Add other options, such as timeout and rate limiting logic
});

//const openai = new OpenAIApi(config);

axiosRetry(openai, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

async function continueConversations(userMessage, tokenSize) {
  try {
    const response = await openai.post('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: userMessage,
      max_tokens: tokenSize
    });
     
    console.log('after success response :', response);
    console.log('after success message response :', response.data.choices[0].message.content);
    console.log('after success total token used :', response.data.usage.total_tokens);
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('Error in conversation:', error);
    return "" + error;
  }
  //return responses;
}

const OpenAiChat = async (req, res) => {
  const userMessage = req.body.data;
  const tokenSize = req.body.tokenSize;
 

  const responses = await continueConversations(userMessage, tokenSize);

  return res.status(200).json({ success: true, messages: responses });
}


module.exports={OpenAiChat};


