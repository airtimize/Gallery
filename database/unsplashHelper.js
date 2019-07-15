const axios = require('axios');
const key = require('../config.js')

module.exports = {
  getImages: (query, cb) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape`;
    axios.get(url, { headers: { Authorization: `Client-ID ${key.unsplash}` } })
      .then((response) => {
        cb(null, response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
