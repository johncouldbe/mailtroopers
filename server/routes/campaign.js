const express   = require('express')
const router    = express.Router()
const {Email}   = require('../models/email')


router.get('/:id', (req, res) => {
  console.log('ID', req.params.id);
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
