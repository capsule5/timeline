import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
import bcrypt from 'bcrypt'
import { User } from '../models'

// Create a passport middleware to handle User login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find the user associated with the email provided by the user
        const user = await User.query()
          .where({ email })
          .first()

        if (!user) {
          // If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found' })
        }
        // Validate password and make sure it matches with the corresponding hash stored in the database
        // If the passwords match, it returns a value of true.
        const validate = await bcrypt.compare(password, user.password)
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }
        // Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

// This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      // secret we used to sign our JWT
      secretOrKey: process.env.JWT_SECRET_OR_KEY,
      jwtFromRequest: ExtractJWT.fromHeader('secret_token'),
    },
    async (jwtPayload, done) => {
      console.warn('[stab]', {
        jwtPayload,
        date_iat: new Date(jwtPayload.iat * 1000), // 
        date_exp: new Date(jwtPayload.exp * 1000),
        date_now: new Date(),
      })
      // if (new Date() > new Date(jwtPayload.exp * 1000)) {
      //   return done('jwt expired')
      // }
      return done(null, jwtPayload)
    }
  )
)
