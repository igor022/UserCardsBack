const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');

const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.post('/', requireAuth, projectController.addProject);
router.delete('/', requireAuth, projectController.deleteProject);
router.patch('/', requireAuth, projectController.editProject);


module.exports = router;