const jwtSecret = 'your_jwt_secret'; // Must match key used in JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // local passport.js

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,   // Username being encoded in the JWT
    expiresIn: '7d',          // Token will expire in 7 days
    algorithm: 'HS256'        // Used to encode the values of the JWT
  });
}

// POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}