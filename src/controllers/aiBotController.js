const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv').config();
const axios = require('axios');

const config = new Configuration({
	apiKey: process.env.AI_KEY,
});

const openai = new OpenAIApi(config);


async function continueConversation(prompt, messages) {
  
  console.log("current conversation list is "+JSON.stringify(messages));
  try {

    // model:"gpt-3.5-turbo",
    const response =await openai.createChatCompletion({
      model:"gpt-3.5-turbo",
      messages: messages,
      max_tokens:50
    });

    console.log("Current Ai answer is ", response.data.choices[0].message.content);
    //console.log("Current used token ", response.usage.total_tokens);
    
    return response.data.choices[0].message.content;

    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
const conversation = [{ role: 'system', content: 'You are a helpful assistant.' },
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."}];
const OpenAiChat = async (req,res) =>{

  const initialMessage = { role: 'system', content: 'You are a helpful assistant.' };
  

  // Add user and assistant messages to the conversation
  conversation.push({ role: 'user', content: req.body.question  });

	const response = await continueConversation(req.body.question , conversation);

  conversation.push({role:'assistant',content:response});

  console.log("current conversation list is "+JSON.stringify(conversation));

  return res.status(200).json({success:true,answer : response});

    // const data = {
    //     model:"gpt-3.5-turbo",
    //     messages: [
    //      // { role: 'system', content: 'You are a helpful assistant.' },
    //       { role: 'user', content: req.body.question },
    //     ],
    //     max_tokens: 1000
    //   };
      
    //   openai.createChatCompletion({
    //     model:"gpt-3.5-turbo",
    //     messages: [
    //        { role: 'system', content: 'You are a helpful assistant.' },
    //        { role: 'user', content: req.body.question },
    //      ],
    //   }).then(response=>{
    //     console.log("Current Ai answer is ", response.data.choices[0].message.content);
    //     return res.status(200).json({success:true,answer : response.data.choices[0].message.content});
    //   });

      // Make the API request
      // response=await axios.post('https://api.openai.com/v1/chat/completions', data, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer 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'
      //   }
      // });
      // console.log("Current Ai answer is ", response.data.choices[0].message.content);
      //     console.log(response.data);
      //     res.status(200).json({success:true,answer : response.data.choices[0].message.content});
        // .then(response => {

    
        //   // Handle the response
          
        // })
        // .catch(error => {
        //   // Handle any errors
        //   console.error(error);
        // });

	// const response = await openai.createCompletion({
	// 	model: "gpt-3.5-turbo",
	// 	prompt: prompt,
	// 	max_tokens: 2048,
	// 	temperature: 1,
	// });

	//const parsableJSONresponse = response.data.choices[0].text;
	//const parsedResponse = JSON.parse(parsableJSONresponse);
	//console.log("Current Ai answer is ", response.data.choices[0].text);
    //console.log("Current Ai full Response is ", response.data);


	// console.log("Question: ", parsedResponse.Q);
	// console.log("Answer: ", parsedResponse.A);
    // res.status(200).json({success:true,data : parsedResponse});



}


module.exports={OpenAiChat};


