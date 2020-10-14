const jwt = require('jsonwebtoken');
const Stuff = require('../models/Stuff')

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};


  if (err.code === 11000) {
    errors.email = "User with such email already exists";
  }
  
  if (err.message.includes('Stuff validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

const maxAgeInSec = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAgeInSec,
  })
}

const signupPost = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const stuff = await Stuff.create({ name, email, password });
    const token = createToken(stuff._id);
    res.status(201).json({ _id: stuff._id, token }); 
  } catch (err) {
    
    res.status(400).json({ errors: handleErrors(err) });
  }
}

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const stuff = await Stuff.login(email, password);
    const token = createToken(stuff._id);
    res.status(200).json({ _id: stuff._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports = {
  signupPost,
  loginPost,
}
