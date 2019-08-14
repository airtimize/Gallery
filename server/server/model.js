const Pool = require('pg').Pool;
const redis = require('redis');
const bluebird = require('bluebird');

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const config = {
  user: 'power_user',
  password: 'Monibu',
  host: '54.183.164.125',
  database: 'sdc',
};

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

client.set('string key', 'string val', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);
client.hkeys('hash key', function (err, replies) {
  console.log(replies.length + ' replies:');
  replies.forEach(function (reply, i) {
      console.log('    ' + i + ': ' + reply);
  });
  // client.quit();
});

const pool = new Pool(config);

const getData = (req, res) => client.getAsync(req.params.listingid)
  .then((success) => {
    // need to figure out how to get this to send info back to the front end.
    res.status(200).json(success.rows);
    console.log('redis success2');
  /* CA: when an image is already in redis, it doesn't work.
  If an image is not in redis then it goes to the catch and
  find the image in postgres and add it to redis.
  To make it work for an image already in redit remove the err handling from catch.
  We need to figure out how to get the image data
  sent back to the client when the data is already in redis. */
  })
  .catch(() => {
    const queryStr = `SELECT * FROM images WHERE listing_id = ${req.params.listingid};`;
    pool.query(queryStr, (err, success) => {
      if (err) {
        res.status(404).send(err);
        return;
      }

      client.set(req.params.listingid, JSON.stringify(success.rows));
      res.status(200).json(success.rows);
    });
  });


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
