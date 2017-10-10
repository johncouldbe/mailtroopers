const express   = require('express')
const router    = express.Router()
const {Email}   = require('../models/email')
const {User}   = require('../models/user')
const shortid   = require('shortid')
const sentencer = require('sentencer')


router.get('/:id', (req, res) => {
  Email
  .find({$or: [{master: req.params.id}, {contributors: req.params.id}]})
  .then(emails => {
    res.send(emails)
  })
})

router.get('/selected/:id', (req, res) => {
  console.log('WE MADE IT');
  Email
  .findOne({_id: req.params.id})
  .then(email => {
    res.send(email)
  })
})

module.exports = router
