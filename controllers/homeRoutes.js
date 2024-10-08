const router = require('express').Router();
const { Project, User } = require('../models');
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

router.get('/leaderboard', (req,res)=> {
  res.render('leaderboard',
    {
      logged_in: req.session.logged_in
    }
  )
})
router.get('/game', (req,res)=> {
  res.render('game',{
    logged_in: req.session.logged_in
})
})

router.get('/gameDisplay', (req,res)=> {
  res.render('gameDisplay')
})
module.exports = router;
