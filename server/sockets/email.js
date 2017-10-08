const {Email}   = require('../models/email')
const shortid   = require('shortid')
const sentencer = require('sentencer')

exports.emailSockets = (socketIo, mail) => {

  socketIo.on('connection', client => {
    client.on('subscribeToEmail', () => {
      console.log('--- client connected ---')

      mail.listen.on("mail", (mail, seqno, attributes) => {
        const address = mail.to[0].address
        const newSlug = address.substr(0, address.indexOf('@'))
        Email
        .update(
          { slug: newSlug },
          { $push: { "versions" : {"html": mail.html} }}
        )
        .then(email => console.log(email))
        .catch(err => console.log(err))

        client.emit('email', mail.html)
      })
    })

   client.on('add campaign', data => {
     const {campaign, user} = data

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

     Email
      .create({
        name: campaign,
        master: user._id,
        slug
      })
      .then(campaign => {
        console.log(campaign.apiRepr());
        client.emit('campaign added', campaign.apiRepr())
      })
      .catch(err => console.log(err))
   })

   client.on('delete campaign', id => {
     console.log("ID", id);
     Email
      .findOneAndRemove({_id: id})
      .then(campaign => {
        client.emit('campaign deleted', campaign.apiRepr())
      })
      .catch(err => console.log(err))
   })
 })

}
