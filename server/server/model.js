const Pool = require('pg').Pool;

const config = {
  user: 'power_user',
  password: 'Monibu',
  host: '54.183.164.125',
  database: 'sdc',
};

const pool = new Pool(config);
const getData = (req, res) => {
  const queryStr = `SELECT * FROM images WHERE listing_id = ${req.params.listingid};`;

  pool.query(queryStr, (err, success) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(success.rows);
    console.log("success")
  });
};

const deletePhoto = (req, res) => {
  const queryStr = `delete from images where "ImageID" = ${req.params.listingid};`;

  pool.query(queryStr, (err, success) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('photo deleted');
  });
};

const addPhoto = (req, res) => {
  const query = `
    INSERT INTO testv1 (Listing_ID, image_url, caption, verified)
      VALUES (1, 'www.google.com', 'super caption', 0);
  `;
  pool.query(query, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send('row added');
  });
};

const updatePhoto = (req, res) => {

  pool.query( "update images set caption = 'Not your average caption!!' where listing_id = 1", (err, success) => {
    if (err) {
      throw err;
    }
    res.status(200).send('row updated')
  });
};

module.exports = {
  getData, deletePhoto, addPhoto, updatePhoto,
};
