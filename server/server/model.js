const { Pool } = require('pg');


const config = {
  user: 'power_user',
  password: 'Monibu',
  host: '54.183.164.125',
  database: 'sdc',
};

const pool = new Pool(config);

const getData = (req, res) => {
  const queryStr = `
    SELECT * FROM images
      WHERE listing_id = ${req.params.listingid};
  `;

  pool.query(queryStr, (err, success) => {
    if (err) {
      res.status(404).send(err);
      return;
    }
    res.status(200).json(success.rows);
  });
};

const deletePhoto = (req, res) => {
  const queryStr = `delete from images where "ImageID" = ${req.params.listingid};`;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('photo deleted');
  });
};

const addPhoto = (req, res) => {
  console.log(req);

  const queryStr = `
    INSERT INTO images (listing_id, "ImageID", "ImageUrl", "Caption", "Verified")
      VALUES (${req.params.listingId}, ${req.body.ImageID}, '${req.body.url}', '${req.body.Cap}', ${req.body.Verified});
  `;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    res.status(200).send('row added');
  });
};

const updateCaption = (req, res) => {

  const queryStr = `UPDATE images SET "Caption" = '${req.params.Caption}' WHERE "ImageID" = ${req.params.ImageID}`;


  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('row updated');
  });
};

module.exports = {
  getData, deletePhoto, addPhoto, updateCaption,
};
