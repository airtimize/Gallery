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
app.delete('/api/:listingid/images', cors(), (req, res) => res.send('deleted'));
app.post('/', db.addPhoto);
app.put('/', db.updatePhoto);

app.listen(port, () => console.log(`SDC listening on port ${port}!`));
