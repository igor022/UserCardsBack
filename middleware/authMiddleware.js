const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.body.jwt;
  console.log(token);
  // check jwt exist and is valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send();
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).send();
  }
}

module.exports = { requireAuth };