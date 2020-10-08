const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getUsers,
}