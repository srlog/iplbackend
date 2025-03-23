const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
require("dotenv").config();

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  teamlogo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
