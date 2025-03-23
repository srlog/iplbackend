const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const auth = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);


router.post('/',auth, isAdmin, teamController.createTeam);
router.post('/bulk',auth, isAdmin, teamController.createBulkTeams);
router.put('/:id', auth, isAdmin, teamController.updateTeam);
router.delete('/:id', auth, isAdmin, teamController.deleteTeam);

module.exports = router;
