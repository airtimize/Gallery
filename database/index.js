/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bedroostimages',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connected to database');
});

module.exports = connection;
