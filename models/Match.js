const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Team = require('./Team');

const Match = sequelize.define('Match', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hometeamid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Team,
            key: 'id',
        }
    },
    awayteamid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Team,
            key: 'id',
        }
    },    
    matchdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seatcount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availableseats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'upcoming',
    },
});

Match.belongsTo(Team, {
    foreignKey: 'hometeamid',
    as: 'hometeam',
    onDelete: 'CASCADE',
});

Match.belongsTo(Team, {
    foreignKey: 'awayteamid',
    as: 'awayteam',
    onDelete: 'CASCADE',
});

module.exports = Match;


