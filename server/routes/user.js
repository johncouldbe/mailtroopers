const express = require('express')
const router  = express.Router()
const {User} = require('../models/user')

router.post('/register', (req, res) => {
  const user = req.body.user
  console.log(user)

  User
  .find({emailAddress: user.email})
  .then(users => {
    if(users.length){
      res.send('An account with this email address already exists.')
    }
    User
    .create(user)
    .then(newUser => res.json(newUser))
  })
})

module.exports = router
