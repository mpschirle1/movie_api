const jwtSecret = "your_jwt_secret"; // Must match key used in JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // local passport.js

/**
 * Generates JSON Web Token for a user (JWT)
 * @param {object} user
 * @returns Username, JWT expiration & algorithm
 * @function generateJWTToken
 */

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username being encoded in the JWT
    expiresIn: "7d", // Token will expire in 7 days
    algorithm: "HS256", // Used to encode the values of the JWT
  });
};

/**
 * POST Login: Authenticates user & Generates JWT
 * @param router
 * @returns JSON object containing user object & token
 * @requires passport
 */

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
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
};
