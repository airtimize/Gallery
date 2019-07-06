const models = require('../models/index')

module.exports = {
  getImages: (req, res) => {
    models.getImages(req.params.listingid, res);
  },
};
