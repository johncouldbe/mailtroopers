const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const simpleParser = require('mailparser').simpleParser

router.post('/', (req, res) => {
  simpleParser(req.body.message, (err, parsed) => {
    const { html, to, subject, date } = parsed
    
    console.log("+++++PARSED+++++", { html, to: to.text, subject, date })
  })
  res.sendStatus(200)
})

module.exports = router
