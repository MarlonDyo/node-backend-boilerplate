const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { dbReadByUsername, dbIsValidPassword } = require('./db/user');
const { jwtSecret } = require('./config');

// JSON web token strategy
passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret,
  }, async (payLoad, done) => {
    try {
      // Find the user specified in token
      dbReadByUsername(payLoad.sub).then((data) => {
        if (data.length === 0) {
          done(null, false);
        } else {
          done(null, data[0]);
        }
      }).catch((err) => {
        // Otherwise, return the user
        done(err, false);
      });
    } catch (error) {
      done(error, false);
    }
  }),
);

// Local strategy
passport.use(
  new LocalStrategy({
    usernameField: 'username',
  }, async (username, password, done) => {
    try {
      dbReadByUsername(username).then((data) => {
        if (data.length === 0) {
          done(null, false);
        } else {
          const passwordHash = data[0].password;
          dbIsValidPassword(passwordHash, password).then((isValid) => {
            if (isValid === true) {
              return done(null, true);
            }
            return done(null, false);
          })
            .catch((err) => done(err, false));
        }
      });
    } catch (error) {
      done(error, false);
    }
  }),
);
