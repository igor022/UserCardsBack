const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send([
    {
      name: 'Robo Albert',
      email: 'mycoolemailfolks@hey.com',
      description: 'I really enjoy this life, I also absolutely love raspberries',
    },
    {
      name: 'Who Am I',
      email: 'whoami@hey.com',
      description: 'Wait, I don\'t know who I am',
    }
  ]);
})

module.exports = router;