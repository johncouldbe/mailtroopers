const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const {User}  = require('../models/user')
const {JWT_SECRET} = require('../config')

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' })
})

router.post('/', (req, res) => {
  // find the user
  User.findOne({
    emailAddress: req.body.emailAddress
  }, (err, user) => {

    if (err) throw err

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign({user}, JWT_SECRET, {
          expiresIn: 120 //expiresIn is in seconds
        })

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }

    }

  })
})

router.get('/users', ensureToken, (req, res) => {
  jwt.verify(req.token, JWT_SECRET, (err, data) => {
    if(err) {
      res.sendStatus(403)
    } else {
      User.find({}, function(err, users) {
        res.json(users)
      })
    }
  })
})

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router
