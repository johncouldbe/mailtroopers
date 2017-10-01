const express   = require('express')
const router    = express.Router()
const {Email}   = require('../models/email')
const shortid   = require('shortid')
const sentencer = require('sentencer')

router.post('/new', (req, res) => {
  const user = req.body.user
  const campaignName = req.body.campaign

  const slugMaker = () => {
    const id =shortid.generate()
    const sentence = sentencer.make('-{{adjective}}-{{noun}}-')
    return `${user.firstName}s${sentence}${id}`
  }
  let slug = slugMaker()

  const checkSlug = slug => (
    Email
    .find({slug})
    .then(email => {
      if(email.length > 0) true
      return false
    })
  )

  //Ensures we create a unique slug
  async function slugIsUnique() {
    let x = await checkSlug()
    while(x){
      slug = slugMaker()
      x = await checkSlug()
    }
  }
  slugIsUnique()

  // Email
  // .create({
  //   name: campaignName,
  //   master: user.email,
  //   slug
  // })
  // .then(email => res.json(email))
  // .catch(err => console.log(err))

})

module.exports = router
