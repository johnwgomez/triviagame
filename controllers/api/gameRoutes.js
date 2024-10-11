

const Score = require('../../models/Score');
const { decodeString } = require('../../utils/helpers');
const router = require('express').Router()
const {triviaForm}= require('../../utils/opentdb')

router.post('/game',async(req,res)=>{
    try{
        const {category, difficulty} = req.body;
        const trivia =  await triviaForm(category,difficulty)
        const question = trivia[0].question
        const decodedQuestion = decodeString(question)

        const triviaAnswers = trivia[0].incorrect_answers
        const correctAnswer = trivia[0].correct_answer
        const decodedCorrect = decodeString(correctAnswer)
    res.render('gameDisplay',
        {   
            question: decodedQuestion,
            incorrects: triviaAnswers,
            correct: decodedCorrect,
            logged_in: req.session.logged_in,
            difficulty
        }
    )
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
} )


router.post('/finish', async(req,res)=> {
    try{
        const {difficulty, incorrect, correct}= req.body;
        const userScore = await Score.findOne({
            where: {
                player_id: req.session.user_id
            }
        })
        if(difficulty==='easy' && correct){
            await userScore.increment('score_number')
        }else if(difficulty==='medium' && correct){
            await userScore.increment('score_number', {by: 2})
        }else if(difficulty==='hard' && correct){
            await userScore.increment('score_number', {by: 3})
        }else if(incorrect){
            res.render('try-again')
        }
    
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

router.get('/something', async(req,res)=> {
    const user = await Score.findOne({
        where: {
            player_id: req.session.user_id
        }
    })
    console.log(user)
    res.json(user)
})







module.exports = router;