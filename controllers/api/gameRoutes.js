const Score = require('../../models/Score')
const router = require('express').Router()
const {triviaForm }= require('../../utils/opentdb')

router.post('/player',async(req,res)=>{
    try{
        const {category, difficulty} = req.body;

        const trivia =  await triviaForm(category,difficulty)
        
        const question = decodeURI(trivia[0].question)
        console.log(question)
    res.render('game',
        {
            question
        }
    )
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
} )


module.exports = router;