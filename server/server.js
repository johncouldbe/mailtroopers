require('dotenv').config()
const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const cors        = require('cors')
const io          = require('socket.io')
const mongoose    = require('mongoose')
const morgan      = require('morgan')
const passport    = require('passport')
const socketioJwt = require('socketio-jwt')

const {
  PORT,
  DATABASE_URL,
  CLIENT_ORIGIN
}                 = require('./config')
const {
  basicStrategy,
   jwtStrategy
 }                = require('./passport/strategies')
const mail        = require('./mailListener')

//Routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const campaignRouter = require('./routes/campaign')

//Sockets
const {emailSockets} = require('./sockets/email')

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(cors({
  origin: CLIENT_ORIGIN,
  allowedHeaders: 'Content-Type, Authorization'
}))

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

//Route initializers
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/campaigns', campaignRouter)


let server;
function runServer(port=PORT, databaseUrl=DATABASE_URL){
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if(err){
        console.log("MONGOOSE ERROR - ", err)
      }

      server = app.listen(port, () => {
        console.log("You're app is listening on port ", port)
        const socketIo = io(server)
        emailSockets(socketIo, mail)
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


if(require.main === module){
  runServer().catch(err => console.log(err))
}

//Export for testing
module.exports = { app, runServer, closeServer }
