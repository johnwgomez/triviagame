const Score = require('../../models/Score');
const { decodeString } = require('../../utils/helpers');
const router = require('express').Router()
const {triviaForm}= require('../../utils/opentdb')
const withAuth = require('../../utils/auth')

router.get('/game', withAuth,async (req, res) => {
    try {
      const { category, difficulty } = req.query;
  
      const trivia = await triviaForm(category, difficulty);
      const question = trivia[0].question;
      const decodedQuestion = decodeString(question);
      const sampleQuestion = [];
      const mappedIncorrects = trivia[0].incorrect_answers.map((question)=> sampleQuestion.push(question))
      sampleQuestion.push(trivia[0].correct_answer)

      const questions = sampleQuestion.sort(()=> Math.random() - 0.5)

  
      const triviaAnswers = trivia[0].incorrect_answers;
      const correctAnswer = trivia[0].correct_answer;
      const decodedCorrect = decodeString(correctAnswer);
      res.render('gameDisplay', {
        question: decodedQuestion,
        incorrects: triviaAnswers,
        correct: decodedCorrect,
        logged_in: req.session.logged_in,
        difficulty,
        questions
      });
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  });

  router.post('/game',async (req, res) => {
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
    }
  
      res.json({ correct: isCorrect, score: updatedScore });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;