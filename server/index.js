/* eslint-disable no-console */
const express = require('express');
const controllers = require('./controllers/index');

const app = express();
const port = process.env.PORT || 3000;

const db = require('../database/index.js');

app.get('/api/:listingid/booking', controllers.getImages)

app.listen(port, () => { console.log(`Listening on port ${port}`); });
