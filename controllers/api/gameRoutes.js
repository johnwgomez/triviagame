const Score = require('../../models/Score')
const {generateTrivia, generateAnswers} = require('../../utils/openai')
const router = require('express').Router()

router.post('/playGame',async(req,res)=>{
    try{
        const {category, difficulty} = req.body;

        const question = await generateTrivia(category, difficulty);
        const answerGenerated = await generateAnswers(question);
        const answers = JSON.parse(answerGenerated)
        res.render('game',{
            question,
            answers: answers.answers,
            logged_in: req.session.logged_in
        })
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
} )

module.exports = router;