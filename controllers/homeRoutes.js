const router = require('express').Router();
const { Score, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req,res)=> {
  res.render('homepage', {
    logged_in: req.session.logged_in
  })
})

router.get('/login', (req,res)=> {
  res.render('login')
})

router.get('/signup', (req,res)=> {
  res.render('signup')
})

router.get('/leaderboard', withAuth,async (req,res)=> {
  try{

    const userScores = await User.findAll(
      {
        include: {
          model: Score,
        },
        order: [
          [Score, 'score_number', 'DESC']
        ]
      }
    )
    const users = userScores.map((user)=> user.get({plain:true}))
  res.render('leaderboard',
    {
      users,
      logged_in: req.session.logged_in
    }
  )
} catch(err){
  res.status(500).json(err)
  console.log(err)
}
})

router.get('/success', (req,res)=>{
  res.render('success', {
    logged_in: req.session.logged_in
  })
})

router.get('/try-again', (req,res)=> {
  res.render('try-again', {
    logged_in: req.session.logged_in
  })
})

module.exports = router;
