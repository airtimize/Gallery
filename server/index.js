/* eslint-disable no-console */
const express = require('express');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 3003;

const db = require('../database/index.js');

app.use('/rooms/:listingid', express.static('../public'));

app.get('/api/:listingid/images', controllers.getImages);

app.listen(port, () => { console.log(`Listening on port ${port}`); });
