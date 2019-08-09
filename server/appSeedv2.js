const express = require('express');

const app = express()
const pg = require('pg');
const format = require('pg-format');

const PGUSER = 'chad';
const PGDATABASE = 'sdc';
const path = require('path');

const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config)
let myClient;

pool.connect((err, client, done) => {
  if (err) console.log(err);
  app.listen(4101, () => {
    console.log('listening on 4101');
  });

  myClient = client;

  // 1. if table exists remove it - v this works v
  const removeTable = 'DROP TABLE IF EXISTS images;';

  myClient.query(removeTable, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('table removed');
  });

  // V creates a table - V this works V

  const createTable = 'create table images (Listing_ID integer, "ImageID" integer, "ImageUrl" text, "Caption" text, "Verified" integer)';

  myClient.query(createTable, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log('Table created');
  });

  // adds rows to the db - v this works

  myClient = client;

  const insertImgInfo ="copy images(listing_id," + '"ImageID", "ImageUrl", "Caption", "Verified"' + ") from" + "'" + path.join(__dirname, "/no_Image_ID.csv")  + "'" + "DELIMITER ',' CSV HEADER;"


  myClient.query(insertImgInfo, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('almost done...');
  });

  // adds an index to help speed up queries
  const createIndex = ';CREATE index getListingId on images(listing_id);';
  myClient.query(createIndex, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('done!');
  });

  console.log('done');
});



// copy images(listing_id, ImageUrl, Caption, Verified) from" + "'" + path.join(__dirname, "/no_Image_ID.csv")  + "'" + "DELIMITER ',' CSV HEADER;"

//aug 7th commit


