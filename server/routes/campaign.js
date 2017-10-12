const express   = require('express')
const router    = express.Router()
const {Email}   = require('../models/email')
const {User}   = require('../models/user')
const shortid   = require('shortid')
const sentencer = require('sentencer')


router.get('/:id', (req, res) => {
  Email
  .find({$or: [{master: req.params.id}, {contributors: req.params.id}]})
  .populate('contributors', 'firstName lastName _id')
  .then(emails => {
    res.send(emails)
  })
})

module.exports = router
