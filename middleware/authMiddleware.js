const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.body.jwt;
  console.log(req.body);
  // check jwt exist and is valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send();
      } else {
        next();
      }
    });
  } else {
    res.status(401).send();
  }
}

module.exports = { requireAuth };