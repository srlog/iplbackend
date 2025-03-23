const Team = require("../models/Team");

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error: error.message });
    }
};

exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team", error: error.message });
    }
};  


exports.createTeam = async (req, res) => {
    try {

        const team = await Team.create(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error creating team", error: error.message });
    }
};

exports.createBulkTeams = async (req, res) => {
    try {   
        const teams = await Team.bulkCreate(req.body);
        res.status(201).json(teams);
    } catch (error) {
        res.status(500).json({ message: "Error creating teams", error: error.message });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        await team.update(req.body);
        const updatedTeam = await Team.findByPk(req.params.id);

        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: "Error updating team", error: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        await team.destroy();
        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting team", error: error.message });
    }
};

