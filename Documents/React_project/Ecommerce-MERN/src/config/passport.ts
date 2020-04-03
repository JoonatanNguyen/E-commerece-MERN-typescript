import passport from 'passport'

import User from '../models/User'

var GoogleTokenStrategy = require('passport-google-id-token')

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
    },
    async function(parsedToken: any, googleId: string, done: Function) {
      const { payload } = parsedToken
      try {
        let user = await User.findOne({ email: payload.email }).exec()
        if (user) {
          return done(null, user)
        }
        user = await User.create({
          email: payload.email,
          isAdmin: payload.email === 'minh.nguyen@integrify.io',
          username: payload.name,
          firstname: payload.given_name,
          lastname: payload.family_name,
          password: 998811,
        })
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
