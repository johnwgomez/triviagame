const router = require('express').Router();
const { User, Score } = require('../../models');

router.post('/login', async(req,res)=> {
  try{
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if(!user){
      res.status(404).json('Wrong email or password')

    }
    const validPass = user.checkPassword(req.body.password);

    if(!validPass){
      res.status(404).json('Incorrect email or password')
    }

    req.session.save(()=> {
      req.session.user_id = user.id 
      req.session.logged_in = true

      res.status(200).json({message: 'You are logged in'})
    })
  }catch(err){
    res.status(500).json(err)
  }
})

router.post('/signup', async(req,res)=> {
  try{
    const newUser = await User.create(req.body,{
      include: {
        model: Score
      }
    })
    await Score.create({
      score_number: 0,
      player_id: newUser.id
    })

    req.session.save(()=>{
      req.session.user_id = newUser.id
      req.session.logged_in = true

      res.status(200).json(newUser)
    })
  }catch(err){
    res.status(500).json('something went wrong')
  }

})

router.post('/logout', (req, res)=> {
    if(req.session.logged_in){
      req.session.destroy(()=> {
        res.status(204).end()
      })
    }else{
      res.render('login')
    }
})

module.exports = router
