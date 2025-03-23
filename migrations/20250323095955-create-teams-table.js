"use strict";
const { DataTypes } = require("sequelize");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Teams", {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Teams");
  },
};
