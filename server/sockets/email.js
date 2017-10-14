const {Email}     = require('../models/email')
const shortid     = require('shortid')
const sentencer   = require('sentencer')
const socketioJwt = require('socketio-jwt')
const {JWT_SECRET} = require('../config')


exports.emailSockets = (socketIo, mail) => {

  socketIo.on('connection', socketioJwt.authorize({
		secret: JWT_SECRET,
		timeout: 15000 // 15 seconds to send the authentication message
	}))
  .on('authenticated', client => {
    console.log('authenticated');
    client.on('subscribeToEmail', () => {
      console.log('--- client connected ---')

      mail.listen.on("mail", function(mail, seqno, attributes) {
        const address = mail.to[0].address
        const newSlug = address.substr(0, address.indexOf('@'))
        console.log('KEYS', Object.keys(mail));
        Email
        .update(
          { slug: newSlug },
          { $push: { "versions" : {
            "html": mail.html,
            "subject": mail.subject
          }}}
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
        client.emit('campaign added', campaign)
      })
      .catch(err => console.log(err))
    })

    client.on('delete campaign', id => {
      Email
        .findOneAndRemove({_id: id})
        .then(campaign => {
          client.emit('campaign deleted', campaign.apiRepr())
        })
        .catch(err => console.log(err))
      })

    client.on('add comment', data => {
     //campaignId version# comment, userId
      console.log("DATA", data.version);

      Email
      .update(
        { _id: data.campaignId, "versions._id": data.version  },
        {
          "$push": { "versions.$.comments": {
            comment: data.comment,
            user: data.userId
          }}
        },
        {new: true}
      )
      .then(e => {
        Email.findOne({ _id: data.campaignId})
          .populate('contributors', 'firstName lastName _id')
          .populate({ path: 'versions.comments',
            populate: { path: 'user', model: 'User'}
            })
          .then(email => {
            client.emit('comment added', {
              email
            })
          })
      })
      .catch(err => console.log(err))
    })


// //This is just to see the comments field afterwords in the first version in the versions array



  })
}
