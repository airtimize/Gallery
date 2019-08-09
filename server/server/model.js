const Pool = require('pg').Pool;
const redis = require("redis"),

client = redis.createClient();

const config = {
  user: 'power_user',
  password: 'Monibu',
  host: '54.183.164.125',
  database: 'sdc',
};

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

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
  console.log(req.params.Cap)

  const queryStr = `INSERT INTO images (listing_id, "ImageID", "ImageUrl", "Caption", "Verified") VALUES (${req.params.listingId}, ${req.params.ImageID}, '${req.params.url}', '${req.params.Cap}', ${req.params.Verified});`;

  pool.query(queryStr, (err) => {
    if (err) {
      console.log(err);
      res.status(404).end();
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
