/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const db = require('./index.js');

const titles = [];
for (let i = 0; i < 100; i++) {
  const newTitle = [];
  const title = faker.fake('{{commerce.productAdjective}} {{address.city}}');
  newTitle.push(title);
  titles.push(newTitle);
}

const images = [];
for (let i = 1; i < 101; i++) {
  for (let j = 0; j < 6; j++) {
    const image = [];
    const listingid = i;
    const url = faker.image.city();
    const caption = faker.lorem.words();
    const verified = Math.round(Math.random());
    image.push(listingid, url, caption, verified);
    images.push(image);
  }
}

const sql = 'INSERT INTO listings (title) VALUES ?';
const imageSql = 'INSERT INTO images (listing_id, ImageUrl, Caption, Verified) VALUES ?';
db.query(sql, [titles], (err) => {
  if (err) {
    console.log(err);
  } else {
    db.query(imageSql, [images], (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
});
