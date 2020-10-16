const express = require('express');

const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.post('/', projectController.addProject);
router.delete('/', projectController.deleteProject);
router.patch('/', projectController.editProject);


module.exports = router;