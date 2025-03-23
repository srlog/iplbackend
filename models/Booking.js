const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Match = require("./Match");
require("dotenv").config();

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: "id",
    },
  },
  matchid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Match, 
      key: "id",
    },
  },
  seatsbooked: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalprice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations before exporting
Booking.belongsTo(User, { foreignKey: "userid", as: "user", onDelete: "CASCADE" });
Booking.belongsTo(Match, { foreignKey: "matchid", as: "match", onDelete: "CASCADE" });

Match.hasMany(Booking, { foreignKey: "matchid", as: "bookings" });

module.exports = Booking;

