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

  //used redis conncect to db
  // make a get request to the db to see if it has the info.
    // if it does have the info then k=just send that back.
    // else get the info from postgres, send that to redis and send that to the response

  //redit client.set

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
  const queryStr = `delete from images where "ImageID" = ${req.params.imageId};`;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.status(200).send('photo deleted');
  });
};

const addPhoto = (req, res) => {
  const queryStr = `INSERT INTO images (listing_id, "ImageID", "ImageUrl", "Caption", "Verified") VALUES (${req.params.listingId}, ${req.body.ImageID}, '${req.body.url}', '${req.body.Cap}', ${req.body.Verified});`;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    res.status(200).send('row added');
  });
};

const updateCaption = (req, res) => {
  const queryStr = `UPDATE images
  SET "${req.body.itemToUpdate}" = '${req.body.update}'
  WHERE "ImageID" = ${req.body.ImageID}`;

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
