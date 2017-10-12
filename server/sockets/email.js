const {Email}   = require('../models/email')
const shortid   = require('shortid')
const sentencer = require('sentencer')

exports.emailSockets = (socketIo, mail) => {

  socketIo.on('connection', client => {
    client.on('subscribeToEmail', () => {
      console.log('--- client connected ---')

      mail.listen.on("mail", function(mail, seqno, attributes) {
        const address = mail.to[0].address
        const newSlug = address.substr(0, address.indexOf('@'))
        console.log('SLUG', mail);

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
      console.log("DATA", data);
      Email
      .update(
        { _id: data.campaignId, "version": data.version },
        {
          $push: {
            "versions.$.version.comments" : {
              "user" : data.userId,
              "comment" : data.comment
            }
          }
        }
      )
      .then(email => {
        console.log('Success', email);
      })

      //This pushed the comment to the beginning of versions array.
            // Email
            // .update(
            //   { _id: data.campaignId, "versions.version": data.version },
            //   {
            //     $push: {
            //       "versions.$.version.comments" : {
            //         "user" : data.userId,
            //         "comment" : data.comment
            //       }
            //     }
            //   }
            // )

//This is just to see the comments field afterwords in the first version in the versions array
      Email.find({ _id: data.campaignId}).then(email => console.log('Success', email[0].versions[0].comments))
    })


    // ======
  })
}
