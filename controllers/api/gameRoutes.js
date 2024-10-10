

const Score = require('../../models/Score');
const { decodeString } = require('../../utils/helpers');
const router = require('express').Router()
const {triviaForm}= require('../../utils/opentdb')

router.post('/game',async(req,res)=>{
    try{
        const {category, difficulty} = req.body;

        console.log(category)
        console.log(difficulty)

        const trivia =  await triviaForm(category,difficulty)
        console.log(trivia)
        const question = trivia[0].question
        console.log(question)
        const decodedQuestion = decodeString(question)
        const triviaAnswers = trivia[0].incorrect_answers
        const correctAnswer = trivia[0].correct_answer
        const decodedCorrect = decodeString(correctAnswer)
    res.render('gameDisplay',
        {   
            question: decodedQuestion,
            incorrects: triviaAnswers,
            correct: decodedCorrect
        }
    )
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
} )






module.exports = router;