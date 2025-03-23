const Match = require("../models/Match");
const { Op } = require("sequelize");

const Team = require("../models/Team");
const Booking = require("../models/Booking");

exports.getAllMatches = async (req, res) => {
  try {
    const now = new Date();

    await Match.update(
      { status: "Completed" },
      { where: { matchdate: { [Op.lt]: now }, status: { [Op.ne]: "Completed" } } }
    );

    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
      order: [["matchdate", "ASC"]],
    });
    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching matches", error: error.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findOne({ where: { id: req.params.id },
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
      order: [["matchdate", "ASC"]],
     });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching match", error: error.message });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const {
      hometeamid,
      awayteamid,
      matchdate,
      venue,
      price,
      seatcount,
      availableseats,
      status,
    } = req.body;

    if (!hometeamid || !awayteamid || !matchdate) {
      return res.status(400).json({
        message: "Missing required fields: hometeamid, awayteamid, date",
      });
    }

    const match = await Match.create({
      hometeamid,
      awayteamid,
      matchdate,
      venue,
      price,
      seatcount,
      availableseats,
      status,
    });
    res.status(201).json(match);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating match", error: error.message });
  }
};

exports.createBulkMatches = async (req, res) => {
  try {
    const matches = await Match.bulkCreate(req.body);
    res.status(201).json({ message: "Matches created successfully", matches });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating matches", error: error.message });
  }
};
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findOne({ where: { id: req.params.id } });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    await match.update(req.body);
    res.status(200).json(match);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating match", error: error.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findOne({ where: { id: req.params.id } });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    await match.destroy();
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting match", error: error.message });
  }
};

exports.getMatchesByTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ hometeamid: teamId }, { awayteamid: teamId }],
      },
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
      order: [["matchdate", "ASC"]],
    });
    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching matches", error: error.message });
  }
};

exports.getMatchesByDate = async (req, res) => {
  try {
    const matchDate = req.params.matchDate;
    const matches = await Match.findAll({
      where: {
        matchdate: matchDate,
      },
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
      order: [["matchdate", "ASC"]],
    });
    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching matches", error: error.message });
  }
};

exports.cancelMatch = async (req, res) => {
  try {
    const match = await Match.findOne({ where: { id: req.params.id } });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    if (new Date(match.matchdate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot cancel a completed match" });
    }

    await match.update({ status: "Canceled" });
    res.status(200).json({ message: "Match canceled successfully", match });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling match", error: error.message });
  }
};

exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      where: { matchdate: { [Op.gte]: new Date() } }, // Matches with future dates
      order: [["matchdate", "ASC"]],
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
    });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching upcoming matches",
      error: error.message,
    });
  }
};

exports.getPastMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      where: { matchdate: { [Op.lt]: new Date() } }, // Matches with past dates
      order: [["matchdate", "DESC"]], include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
    });

    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching past matches", error: error.message });
  }
};

exports.getMatchesByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const validStatuses = ["Scheduled", "Completed", "Canceled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed values: Scheduled, Completed, Canceled",
      });
    }
    const matches = await Match.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Team,
          as: "hometeam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Team,
          as: "awayteam",
          attributes: ["id", "teamname", "teamlogo"],
        },
        {
          model: Booking,
          as: "bookings",
          attributes: ["id", "userid", "seatsbooked"],
        },
      ],
      order: [["matchdate", "ASC"]],
    });
    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching matches", error: error.message });
  }
};
