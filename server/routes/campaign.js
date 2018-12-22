const express   = require('express')
const router    = express.Router()
const querystring = require('querystring');
const MailParser = require("mailparser").MailParser;
const { Email }   = require('../models/email')


router.get('/:id', (req, res) => {
  Email
  .find({$or: [{master: req.params.id}, {contributors: req.params.id}]})
  .sort('-date')
  .populate('contributors', 'email firstName lastName _id')
  .populate('versions.comments.user', 'firstName lastName _id')
  .then(emails => {
    res.send(emails)
  })
})

module.exports = router
