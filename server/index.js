/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const db = require('../database/index.js');
const seed = require('../database/seed.js');

app.listen(port, () => { console.log(`Listening on port ${port}`); });
