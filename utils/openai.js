const  OpenAI = require('openai')
require('dotenv').config()



const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.ORGANIZATION_ID,
    project: process.env.PROJECT_ID,
});

const generateTrivia = async (category, difficulty)=> {
    const prompt = `Generate a ${difficulty} question in the category ${category}.`;

    try{
       const response = await openai.chat.completions.create({
        messages: [{role: 'system', content: `${prompt}`}],
        model: 'gpt-4'
       })

        const text = response.choices[0].message.content;
        return text
    }catch(err){
        console.error('Error generating question', err)
    }
}

 




const generateAnswers = async(question)=> {
    const prompt = `Generate four multiple-choice answers for the following question: "${question}". Return the answers in a JSON object called "answers". Each answer should be an object called "choice", and each "choice" should have two keys: "text" (the answer text) and "isCorrect" (a boolean indicating if the answer is correct). Only one of the choices should have "isCorrect" set to true. Make sure the JSON is valid and properly formatted. Example:

answers = {
    {
      "choice": {
        "text": "Answer 1",
        "isCorrect": false
      }
    },
    {
      "choice": {
        "text": "Answer 2",
        "isCorrect": true
      }
    },
    {
      "choice": {
        "text": "Answer 3",
        "isCorrect": false
      }
    },
    {
      "choice": {
        "text": "Answer 4",
        "isCorrect": false
      }
    }
  
}`
    try{
        const response = await openai.chat.completions.create({
            messages: [{role: 'system', content: `${prompt}`}],
            model: 'gpt-4'
        })

        const answers = response.choices[0].message.content;
        
        console.log(answers)
        return answers
    }catch(err){
        console.error('Error generating answers', err)
    }
}
module.exports = {generateTrivia, generateAnswers}