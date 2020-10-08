const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const results = await User.find();
    res.send(results);
  } catch(err) {
    console.log(err);
  }
}

const addUser = async (req, res) => {
  try {
    const { name, email, description } = req.params;
    const user = new User({ name, email, description });
    user.save();
    
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  getUsers,
}