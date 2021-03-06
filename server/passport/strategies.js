const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt')

const {User} = require('../models/user')
const {JWT_SECRET} = require('../config')

const basicStrategy = new BasicStrategy((email, password, callback) => {
    let user

    User.findOne({email: email})
        .then(_user => {
            user = _user
            if (!user) {
              console.log('No user')
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                })
            }
            return user.validatePassword(password)
        })
        .then(isValid => {
            if (!isValid) {
              console.log('Password not valid')
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                })
            }
            return callback(null, user)
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
                return callback(null, false, err)
            }
            return callback(err, false)
        })
})

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        // Look for the JWT as a Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        // Only allow HS256 tokens - the same as the ones we issue
        algorithms: ['HS256']
    },
    (payload, done) => {
      done(null, payload.user)
    }
)

module.exports = {basicStrategy, jwtStrategy}
