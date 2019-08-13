require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const db = require('./model');

app.use(bodyParser.json());

const port = 4022;

app.get('/loaderio-3e75fb58c8e89178bfa8a05ccbcecc3c.txt', (req, res) => res.sendFile(path.resolve(__dirname, '../../public/loaderio-3e75fb58c8e89178bfa8a05ccbcecc3c.txt')));

app.use('/:listingid', express.static(path.resolve(__dirname, '..', '..', 'public')));

app.get('/api/listings/:listingid/images', cors(), db.getData);

app.delete('/api/images/:imageId', cors(), db.deletePhoto);

app.post('/api/listing/:listingId/image', cors(), db.addPhoto);

app.put('/api/listings', cors(), db.updateCaption);


app.listen(port, () => console.log(`SDC listening on port ${port}!`));
