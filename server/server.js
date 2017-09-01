require('dotenv').config()
const MailListener = require("mail-listener2");

const  mailListener = new MailListener({
  username: "johndouglasb@gmail.com",
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
  // markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  // fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  // mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  // attachments: true, // download attachments as they are encountered to the project directory
  // attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start();


mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log(mail.html)

  // mail processing code goes here
});
