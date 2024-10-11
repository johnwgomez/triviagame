

const Score = require('../../models/Score');
const { decodeString } = require('../../utils/helpers');
const router = require('express').Router()
const {triviaForm}= require('../../utils/opentdb')
router.get('/game', async (req, res) => {
    try {
      const { category, difficulty } = req.query;
  
      const trivia = await triviaForm(category, difficulty);
      const question = trivia[0].question;
      const decodedQuestion = decodeString(question);
  
      const triviaAnswers = trivia[0].incorrect_answers;
      const correctAnswer = trivia[0].correct_answer;
      const decodedCorrect = decodeString(correctAnswer);
      console.log(trivia)
  
      res.render('gameDisplay', {
        question: decodedQuestion,
        incorrects: triviaAnswers,
        correct: decodedCorrect,
        logged_in: req.session.logged_in,
        difficulty
      });
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  });

  router.post('/game', async (req, res) => {
    try {
      const { answer, difficulty, correct } = req.body;
      const isCorrect = answer === correct;
      let updatedScore = 0;
      const userId = req.session.user_id;
      const userScore = await Score.findOne({ where: { player_id: userId } });
      if(userScore){
      if (isCorrect && difficulty==='Easy') {
          await userScore.increment('score_number', { by: 1 });
          updatedScore = userScore.score_number + 1;
      }else if(isCorrect && difficulty==='Medium'){
        
            await userScore.increment('score_number', {by: 2});
            updatedScore = userScore.score_number + 2
        
      }else if(isCorrect && difficulty ==='Hard'){
        
            await userScore.increment('score_number', {by: 3});
            updatedScore = userScore.score_number + 3
        
      }
    }else {
        const newScore = await Score.create({ player_id: userId, score_number: 1 });
        updatedScore = newScore.score_number;
      }
  
      res.json({ correct: isCorrect, score: updatedScore });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;