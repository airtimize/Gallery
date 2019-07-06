/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const db = require('./index.js');
const unsplash = require('./unsplashHelper.js');

unsplash.getImages('house', (err, houseData) => {
  if (err) {
    console.log(err);
  } else {
    console.log('got houses');
    unsplash.getImages('interiors', (err, interiorData) => {
      if (err) {
        console.log(err);
      } else {
        console.log('got interiors');
        const titles = [];
        for (let i = 0; i < 100; i++) {
          const newTitle = [];
          const title = faker.fake('{{commerce.productAdjective}} {{address.city}}');
          newTitle.push(title);
          titles.push(newTitle);
        }
        const images = [];
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 6; j++) {
            const image = [];
            const listingid = i + 1;
            // eslint-disable-next-line max-len
            const randLess10 = Math.floor(Math.random() * 30);
            const url = (j === 0) ? houseData.results[randLess10].urls.regular : interiorData.results[randLess10].urls.regular;
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
            console.log('error inserting listings');
          } else {
            console.log('successfully inserted listings');
            db.query(imageSql, [images], (error, success) => {
              if (error) {
                console.log('error inserting images');
                console.log(error.code);
              } else {
                console.log('survived callback hell');
              }
            });
          }
        });
      }
    });
  }
});
