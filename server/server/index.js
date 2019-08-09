require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const db = require('./model');

const port = 4022;

app.get('/loaderio-3e75fb58c8e89178bfa8a05ccbcecc3c.txt', (req, res) => res.sendFile(path.resolve(__dirname, '../../public/loaderio-3e75fb58c8e89178bfa8a05ccbcecc3c.txt')));

app.use('/:listingid', express.static(path.resolve(__dirname, '..', '..', 'public')));

app.get('/api/:listingid/images', cors(), db.getData);

// make sure to change the img to delete in the model.js
// app.delete('/', db.deletePhoto);
app.delete('/api/:listingid/images', cors(), db.deletePhoto);


// app.post('/api/:listing_id/:ImageID/:Caption/:Verified/images', cors(), db.addPhoto);
app.post('/api/:listingId/:ImageID/images', cors(), db.addPhoto);

app.put('/api/:ImageID/:Caption/images', cors(), db.updateCaption);

app.listen(port, () => console.log(`SDC listening on port ${port}!`));
