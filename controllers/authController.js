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
    res.cookie('jwt', token, { maxAge: maxAgeInSec * 1000, httpOnly: true });
    res.status(201).json({ _id: stuff._id }); 
  } catch (err) {
    
    res.status(400).json({ errors: handleErrors(err) });
  }
}

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const stuff = await Stuff.login(email, password);
    const token = createToken(stuff._id);
    res.cookie('jwt', token, { maxAge: maxAgeInSec * 1000, httpOnly: true });
    res.status(200).json({ _id: stuff._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({});
  }
}

const loginGet = (req, res) => {

}

const signupGet = (req, res) => {
  
}

const cookiesGet = (req, res) => {
  res.cookie('newUser', true, { httpOnly: true });
  res.send('you got the cookies!');
}

module.exports = {
  signupPost,
  loginPost,
  cookiesGet
}
