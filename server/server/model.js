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

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('photo deleted');
  });
};

const addPhoto = (req, res) => {
  const queryStr = `INSERT INTO images (listing_id, "ImageID", "ImageUrl", "Caption", "Verified") VALUES (${req.params.listingId}, ${req.params.ImageID}, 'www.google3.com', ${req.params.Caption}, ${req.params.Verified});`;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('row added');
  });
};

const updateCaption = (req, res) => {
  // const queryStr = "update images set caption = 'Not your average caption!!' where listing_id = 1";

  // http://54.183.55.167:4022/api/123/images -- this should update the photo with ImageID 123 and update it's caption to 'Not your average caption!!'


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
