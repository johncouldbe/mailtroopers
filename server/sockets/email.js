const {Email}     = require('../models/email')
const {User}     = require('../models/user')
const shortid     = require('shortid')
const sentencer   = require('sentencer')
const socketioJwt = require('socketio-jwt')
const {JWT_SECRET} = require('../config')
const io          = require('socket.io')

exports.emailSockets = (socketIo, mail) => {
  let gUser
  let gClient

  socketIo.on('connection', socketioJwt.authorize({
		secret: JWT_SECRET,
		timeout: 15000 // 15 seconds to send the authentication message
	}))
  .on('authenticated', client => {
    console.log('authenticated')
    gClient = client

    client.on('subscribeToEmail', userId => {
      console.log('--- client connected ---', userId)
      gUser = userId.userId
    })

    client.on('room', room => {
      console.log('--- Joined Room ---', room)
      client.join(room)
    })

    client.on('disconnect', () => {
      console.log('DISCONNECTED')
    })

   client.on('add campaign', data => {
     const {campaign, user} = data

     const slugMaker = () => {
       const id = shortid.generate()
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
        const campaignId = campaign._id
        client.join(campaignId)
        socketIo.in(campaignId).emit('campaign added', campaign)
      })
      .catch(err => console.log(err))
    })

    client.on('delete campaign', id => {
      Email
        .findOneAndRemove({_id: id})
        .then(campaign => {
          socketIo.in(id).emit('campaign deleted', campaign.apiRepr())
        })
        .catch(err => console.log(err))
    })

    client.on('add comment', data => {
      const id = data.campaignId
      Email
        .update(
          { _id: id, "versions._id": data.version  },
          {
            "$push": { "versions.$.comments": {
              comment: data.comment,
              user: data.userId
            }}
          }
        )
        .then(e => {
          Email.findOne({ _id: id})
            .populate('contributors', 'firstName lastName _id')
              .populate('versions.comments.user', 'firstName lastName _id')
            .then(email => {
              // use moment on date
              socketIo.in(id).emit('update campaign', {
                email
              })
            })
        })
        .catch(err => console.log(err))
    })

    client.on('delete comment', data => {
      const id = data.campaignId

      Email
      .update(
        { _id: id, "versions._id": data.version  },
        {
          "$pull": { "versions.$.comments": {
            _id: data.commentId
          }}
        }
      )
      .then(e => {
        Email.findOne({ _id: id})
          .populate('contributors', 'firstName lastName _id')
          .populate('versions.comments.user', 'firstName lastName _id')
          .then(email => {
            socketIo.in(id).emit('update campaign', {
              email
            })
          })
      })
      .catch(err => console.log(err))
    })

    client.on('recruit', data => {
      const addresses = data.addresses
      const id = data.id

      User
      .find({email: {$in: addresses}})
      .then(users => {
        const successfulIds = users.map(user => user._id)
        const successful = users.map(user => user.email)
        const failures = addresses.filter(address => {
          return successful.indexOf(address) === -1
        })

        Email
        .update(
          { _id: id },
          {
            $push: { "contributors": {$each: successfulIds}}
          },
          { upsert: true } //This doesn't work...
        )
        .then(e => {
          if(!successful.length) {
            return client.emit('recruited', {
              successful,
              failures
            })
          }

          Email.findOne({ _id: id})
            .populate('contributors', 'firstName lastName _id')
            .populate('versions.comments.user', 'firstName lastName _id')
            .then(campaign => {
              const campaignId = campaign._id
              successfulIds.map(id => socketIo.in(id).emit('campaign added', campaign))
              successfulIds.map(id => socketIo.in(id).emit('join room', campaignId))

              const email = campaign
              socketIo.in(id).emit('update campaign', {
                email
              })

              client.emit('recruited', {
                successful,
                failures
              })
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
    })

    client.on('remove recruit', data => {
      const recruit = data.recruit
      const id = data.campaignId

      console.log(data);

      Email.update(
        { _id: id },
        {
          $pull: { "contributors": recruit}
        }
      )
      .then(() => {
          Email.findOne({ _id: id})
            .populate('contributors', 'firstName lastName _id')
            .populate('versions.comments.user', 'firstName lastName _id')
            .then(email => {
              client.emit('update campaign', {
                email
              })

              socketIo.in(recruit).emit('campaign deleted', {
                _id: id
              })
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })


    client.on('delete version', data => {
      const id = data.campaignId
      const version = data.version

      Email.update(
        { _id: id },
        {
          $pull: { "versions": {_id: version} }
        }
      )
      .then(() => {
        Email.findOne({ _id: id})
          .populate('contributors', 'firstName lastName _id')
          .populate('versions.comments.user', 'firstName lastName _id')
          .then(email => {
            socketIo.in(id).emit('update campaign', {
              email
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })

    client.on('stop contributing', data => {
      console.log(data)
    })

  })

  mail.listen.on("mail", function(mail, seqno, attributes) {
    const address = mail.to[0].address
    const newSlug = address.substr(0, address.indexOf('@'))
    Email
    .update(
      { slug: newSlug },
      { $push: { "versions" : {
        "html": mail.html,
        "subject": mail.subject
      }}}
    )
    .then(e => {
      Email
        .findOne({ slug: newSlug })
        .populate('contributors', 'firstName lastName _id')
        .populate('versions.comments.user', 'firstName lastName _id')
        .then(email => {
          socketIo.in(email._id).emit('update campaign', {email})
        })
    })
    .catch(err => console.log(err))
  })
}
