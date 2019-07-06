/* eslint-disable no-console */
const db = require('../../database/index');

module.exports = {
  getImages: (id, res) => {
    const sql = `SELECT * FROM images INNER JOIN listings ON
    (listings.listingID = images.listing_id) WHERE listings.listingID = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.log('error getting images from db');
      } else {
        res.send(results);
      }
    });
  },
};
