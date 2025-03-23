
const Booking = require("../models/Booking");
const User = require("../models/User");
const Match = require("../models/Match");
const Team = require("../models/Team");

exports.createBooking = async (req, res) => {
  try {
    const { userid, matchid, seatsbooked, totalprice } = req.body;

    //Finding the match to decreement the seats.
    const match = await Match.findOne({ where: { id: matchid } });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    if (match.availableseats < seatsbooked) {
      return res.status(400).json({ message: "Not enough available seats" });
    }
    const booking = await Booking.create({
      userid,
      matchid,
      seatsbooked,
      totalprice,
    });
    match.update({ availableseats: match.availableseats - seatsbooked });
    res.status(201).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

exports.createbulkBookings = async (req, res) => {
  try {
    const bookings = await Booking.bulkCreate(req.body);    

    bookings.forEach(async (booking) => {
      const match = await Match.findOne({ where: { id: booking.matchid } });  
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
      if (match.availableseats < booking.seatsbooked) {
        return res.status(400).json({ message: "Not enough available seats" });
      }      
      match.update({ availableseats: match.availableseats - booking.seatsbooked });
    });


    res.status(201).json(bookings);
  } catch (error) {    
    res.status(500).json({ message: "Error creating bookings", error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: Match,
          as: "match",
          attributes: [
            "id",
            "hometeamid",
            "awayteamid",
            "matchdate",
            "availableseats",
          ],
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
          ],
        },
      ],
    });

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Extracting the matchId and seatsbooked dynamicaly
    const { matchid, seatsbooked, ...rest } = req.body;

    // If matchId is given, swap the available seats from new match to the old match.
    if (matchid) {
      const match = await Match.findOne({ where: { id: matchid } });
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      // Restore seats from the old match
      if (booking.matchid && booking.matchid !== matchid) {
        const oldMatch = await Match.findOne({
          where: { id: booking.matchid },
        });
        if (oldMatch) {
          oldMatch.availableseats += booking.seatsbooked; // Restore old seats
          await oldMatch.save();
        }
      }

      // Reduce available seats in the new match
      if (match.availableseats < seatsbooked) {
        return res
          .status(400)
          .json({ message: "Not enough available seats in this match" });
      }
      match.availableseats -= seatsbooked;
      await match.save();
    }

    // If seatsbooked is given, update the current seats booked.
    if (seatsbooked) {
      const match = await Match.findOne({
        where: { id: matchid || booking.matchid },
      });
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      const seatDifference = seatsbooked - booking.seatsbooked;
      if (match.availableseats < seatDifference) {
        return res.status(400).json({ message: "Not enough available seats" });
      }

      match.availableseats -= seatDifference;
      await match.save();
    }

    // Update the booking with new data
    await booking.update(req.body);
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const match = await Match.findOne({ where: { id: booking.matchid } });
    console.log(booking.seatsbooked);
    console.log('seats after updation', match.availableseats); 
    match.update({ availableseats: match.availableseats + booking.seatsbooked });
    console.log('seats before updation', match.availableseats); 
  
    await Booking.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      where: { userid: req.params.userid },
      include: [
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'matchdate'],
          include: [
            {
              model: Team,
              as: 'hometeam',
              attributes: ['id', 'teamname', 'teamlogo'],
            },
            {
              model: Team,
              as: 'awayteam',
              attributes: ['id', 'teamname', 'teamlogo'],
            },
          ],
        },
      ],
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

exports.getBookingByMatchId = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      where: { matchid: req.params.matchid },
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};
