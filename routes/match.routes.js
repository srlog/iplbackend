const express = require("express");
const matchController = require("../controllers/match.controller");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();


router.get("/", matchController.getAllMatches);

// Fetching matches by queries
router.get("/team/:teamId", matchController.getMatchesByTeam);
router.get("/date/:matchDate", matchController.getMatchesByDate);
router.get("/upcoming", matchController.getUpcomingMatches);
router.get("/past", matchController.getPastMatches);
router.get("/status/:status", matchController.getMatchesByStatus);
router.get("/:id", matchController.getMatchById);


// Creating, updating, and deleting mathces require Admin privileges
router.post("/", auth, isAdmin, matchController.createMatch);
router.post("/bulk", auth, isAdmin, matchController.createBulkMatches);
router.put("/:id", auth, isAdmin, matchController.updateMatch);
router.delete("/:id", auth, isAdmin, matchController.deleteMatch);
router.put("/cancel/:id", auth, isAdmin, matchController.cancelMatch);


module.exports = router;
