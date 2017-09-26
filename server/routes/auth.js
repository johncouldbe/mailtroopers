const express = require('express')
const passport = require('passport')
const jwt     = require('jsonwebtoken')
const {User}  = require('../models/user')
const {JWT_SECRET, JWT_EXPIRE} = require('../config')
const cors        = require('cors')

const router  = express.Router()

const createAuthToken = user => (
    jwt.sign({user}, JWT_SECRET, {
        subject: user.email,
        expiresIn: JWT_EXPIRE
    })
)

router.post(
    '/login',
    // The user provides a username and password to login
    passport.authenticate('basic', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user.apiRepr())
        res.json({authToken})
    }
)

router.post(
    '/refresh',
    // The user exchanges an existing valid JWT for a new one with a later
    // expiration
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken});
    }
);

// router.post('/login', (req, res) => {
//   if(!req.body.user) res.send('No user specified.')
//
//   const user = req.body.user
//   let dbUser
//
//   User.findOne({email: user.email}, (err, _user) => {
//     if (err) throw err
//
//     if (!dbUser) {
//       res.json({ err: 'Uh Oh! We can\'t find an account for that email address.' })
//     } else {
//       dbUser = _user
//       dbUser.validatePassword(user.password)
//       .then(valid => {
//         if (!valid) {
//           res.json({ err: 'That password doesn\'t match the account of the email address provided.' })
//         } else {
//           const authToken = createAuthToken(dbUser)
//           res.json(authToken)
//           console.log(authToken);
//         }
//       })
//     }
//
//   })
// })

// router.get('/users', ensureToken, (req, res) => {
//   jwt.verify(req.token, JWT_SECRET, (err, data) => {
//     if(err) {
//       res.sendStatus(403)
//     } else {
//       User.find({}, function(err, users) {
//         res.json(users)
//       })
//     }
//   })
// })

module.exports = router
