/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  // host: '172.17.0.2',
  host: 'localhost',
  user: 'root',
  multipleStatements: true,
});

const sql = `
CREATE DATABASE IF NOT EXISTS bedroostimages;

USE bedroostimages;

CREATE TABLE IF NOT EXISTS listings (
  listingID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(40),
  PRIMARY KEY (listingID)
);

CREATE TABLE IF NOT EXISTS images (
  listing_id INT NOT NULL,
  ImageID INT AUTO_INCREMENT PRIMARY KEY,
  ImageUrl VARCHAR(200),
  Caption VARCHAR(40),
  Verified INT,
  FOREIGN KEY (listing_ID)
    REFERENCES listings (listingID)
);`


connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('connected to database');
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully created tables');
    }
  });
});

module.exports = connection;
