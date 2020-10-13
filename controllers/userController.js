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
    const { name, email, description } = req.body;
    const user = new User({ name, email, description });
    await user.save();
    res.send(user);
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
    const id = req.body.id;
    await User.findByIdAndDelete(id);
    // load updated list of users
    const results = await loadUsers();
    res.send(results);

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