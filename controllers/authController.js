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

const signupGet = (req, res) => {
  res.send("signup");
}

const signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const stuff = await Stuff.create({ email, password });
    res.status(201).json(stuff); 
  } catch (err) {
    
    res.status(400).json(handleErrors(err));
  }
}

const loginGet = (req, res) => {
  res.send("login");
}

const loginPost = (req, res) => {
  res.json(req.body);
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost
}
