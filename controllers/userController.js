const User = require('../models/User');

const loadUsers = async() => {
  const results = await User.find().sort({ createdAt: -1 });
  return results;
} 

const getUsers = async (req, res) => {
  try {
    const results = await loadUsers();
    res.send(results);
  } catch(err) {
    console.log(err);
  }
}

const addUser = async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = new User(user);
    await newUser.save();
    res.send(newUser);
  } catch(err) {
    console.log(err);
  }
}

const editUser = async (req, res) => {
  try {
    const { user } = req.body;
    await User.updateOne({ _id: user._id }, user);
    const updatedUser = await User.findOne({ _id: user._id});
    res.send(updatedUser);
  } catch(err) {
    throw(err);
  }
}

const deleteUser = async (req, res) => {
  try {
    // delete user
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    
    res.send(user);

  } catch (err) {
    throw(err);
  }
}

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser
}