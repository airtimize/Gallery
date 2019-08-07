const Pool = require('pg').Pool;

const PGUSER = 'chad';
const PGDATABASE = 'sdc';

const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);
const getData = (req, res) => {
  const queryStr = 'select * from images where listing_id = $1;';

  const values = [req.params.listingid];
  pool.query(queryStr, values, (err, success) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json(success.rows);
  });
};

const deletePhoto = (req, res) => {
    pool.query("delete from testv1 where image_id = 3000005;", (err, success) => {
        if(err){
            throw err;
        }
        res.status(200).send("photo deleted")
    })
};

const addPhoto = (req, res) => {
    pool.query("insert into testv1 (Listing_ID, image_url, caption, verified) values(1, 'www.google.com', 'super caption', 0);", (err, success) => {
        if(err){
            throw err;
        }
        res.status(200).send("row added")
    })
};

const updatePhoto = (req, res) => {

    pool.query( "update testv1 set caption = 'Not your average caption!!' where listing_id = 1", (err, success) => {
        if(err){
            throw err;
        }
        res.status(200).send("row updated")
    })
};

module.exports = { getData, deletePhoto, addPhoto, updatePhoto };
