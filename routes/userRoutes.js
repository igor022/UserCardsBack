const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.post('/',  userController.addUser);

router.delete('/',  userController.deleteUser);

router.patch('/', requireAuth, userController.editUser);

module.exports = router;