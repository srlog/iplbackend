const mysql = require("mysql2/promise");
require("dotenv").config();
const sequelize = require("../config/db");


async function addData(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    const teamsText =  (await import('fs').then(m => m.promises.readFile('./teams.txt'))).toString();
    // Add teams
    await connection.query(teamsText);

    const matchesText =  (await import('fs').then(m => m.promises.readFile('./matches.txt'))).toString();
    // Add matches
    await connection.query(matchesText);

    const bookingsText =  (await import('fs').then(m => m.promises.readFile('./bookings.txt'))).toString();
    // Add bookings     
    await connection.query(bookingsText);

    await connection.end();
}

addData();  