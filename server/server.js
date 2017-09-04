require('dotenv').config()
const MailListener = require("mail-listener2")
const io = require('socket.io')();

const port = process.env.PORT || 8080;
io.listen(port);
console.log('socket listening on port ', port);

const  mailListener = new MailListener({
  username: "mailtroopersapp@gmail.com",
  password: process.env.PASS,
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  // tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  // searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  // mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  // attachments: true, // download attachments as they are encountered to the project directory
  // attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start();

let mailArray = []

io.on('connection', client => {
  client.on('subscribeToEmail', () => {
    console.log('--- client connected ---')
    mailListener.on("mail", function(mail, seqno, attributes){
      // do something with mail object including attachments
      console.log("MAIL", mail.html)
      client.emit('email', mail.html)
    })
  })
  // mailArray.push(mail.html)
  // console.log(mailArray[mailArray.length - 1]);
  // mail processing code goes here
})
