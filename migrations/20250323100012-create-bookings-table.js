"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      matchid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Match",
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};

