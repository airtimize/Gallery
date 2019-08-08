require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const db = require('./model');

const port = 4022;
app.use('/:listingid', express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use('loaderio-bf2975d3c6e30967cdecbee287c795ad/', express.static(path.resolve(__dirname, 'loaderio-bf2975d3c6e30967cdecbee287c795ad.txt')));


// app.get('/api/:listingid', db.getData); // this works with postman //http://localhost:4022/api/123

app.get('/api/:listingid/images', cors(), db.getData);

// make sure to change the img to delete in the model.js
app.delete('/', db.deletePhoto);
app.post('/', db.addPhoto);
app.put('/', db.updatePhoto);

app.listen(port, () => console.log(`SDC listening on port ${port}!`));
