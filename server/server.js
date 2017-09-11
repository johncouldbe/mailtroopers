require('dotenv').config()
const express = require('express')
const app = express();
const io = require('socket.io');
const mongoose = require('mongoose')
const {PORT, DATABASE_URL} = require('./config')
const {User} = require('./models/user')
const {Email} = require('./models/email')
const mail = require('./mailListener')


let server, socketIo;
function runServer(port=PORT, databaseUrl=DATABASE_URL){
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if(err){
        console.log("MONGOOSE ERROR - ", err)
      }

      server = app.listen(port, () => {
        console.log("You're app is listening on port ", port)
        socketIo = io(server)
        sockets()
        console.log('socket listening on port ', port)
      })


      resolve()
    })
    .on('error', err => {
      mongoose.disconnect()
      reject(err)
    })
  })
}

function closeServer() {
  return mongoose.disconnect.then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');

      server.close(err => {
        if(err){
          return reject(err)
        }

        resolve()
      })
    })
  })
}

mail.listen.start();

const sockets = () => {
  socketIo.on('connection', client => {
   client.on('subscribeToEmail', () => {
     console.log('--- client connected ---')

     mail.listen.on("mail", function(mail, seqno, attributes){
       console.log('Sending Mail')

       client.emit('email', mail.html)
     })
   })
 })
}

if(require.main === module){
  runServer().catch(err => console.log(err));
}

if(process.env.NODE_ENV === 'production'){
  runServer().catch(err => console.log(err));
}

//Export for testing
module.exports = { app, runServer, closeServer };
