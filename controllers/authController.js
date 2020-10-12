const signupGet = (req, res) => {
  res.send("signup");
}

const signupPost = (req, res) => {
  res.json(req.body)
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
