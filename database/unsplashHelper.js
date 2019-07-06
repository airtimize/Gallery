const axios = require('axios');

module.exports = {
  getImages: (query, cb) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30`;
    axios.get(url, { headers: { Authorization: 'Client-ID 4dac92068be801e69afc73ce235b0cbe963dc64a852809e2cd64518e58b6186c' } })
      .then((response) => {
        cb(null, response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
