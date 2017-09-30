const express = require('express')
const router  = express.Router()
const {Email} = require('../models/email')

router.post('/new', (req, res) => {
  res.send('Yeah!!!!')
})

module.exports = router
