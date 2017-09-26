const express = require('express')
const router  = express.Router()
const {User} = require('../models/user')
const {JWT_SECRET, JWS_EXPIRE} = require('../config')

router.post('/register', (req, res) => {
  const user = req.body.user

  User
  .find({email: user.email})
  .then(users => {
    if(users.length > 0){
      res.json({err: 'An account with this email address already exists.'})
    } else {
      return User.hashPassword(user.password)
    }
  })
  .then(hash => {
    user.password = hash

    User
    .create(user)
    .then(newUser => res.json(newUser))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router
