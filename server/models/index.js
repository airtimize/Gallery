const db = require('../../database/index');

module.exports = {
  getImages: (id, res) => {
    const sql = 'SELECT * FROM images, listings WHERE listings.listingID = images.listing_id';
    db.query(sql, (err, results) => {
      if (err) {
        console.log('error getting images from db');
      } else {
        res.send(results);
      }
    });
  },
};