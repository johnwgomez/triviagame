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

router.get('/leaderboard', async (req,res)=> {
  try{

    const userScores = await User.findAll(
      {
        include: {
          model: Score,
          order: 'ASC'
        }
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

module.exports = router;
