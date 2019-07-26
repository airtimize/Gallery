/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker'); // faker is used to create the title of the image, specficlly the city name.
const db = require('./index.js'); // mySQL connection
const unsplash = require('./unsplashHelper.js'); // this is the get request to the unsplash api

unsplash.getImages('house', (err, houseData) => { // house = the query for the search
  if (err) {
    console.log(err);
  } else {
    console.log('got houses');
    unsplash.getImages('interiors', (err, interiorData) => {
      if (err) {
        console.log(err);
      } else {
        console.log('got interiors');
        const titles = []; // empty array to push titles into.
        for (let i = 0; i < 100; i++) {
          const newTitle = [];
          const title = faker.fake('{{commerce.productAdjective}} {{address.city}}');
          newTitle.push(title); // push the faker title
          titles.push(newTitle); // push the array to the titles array
        }
        const images = []; // an array to hold an array of images per listing
        for (let i = 0; i < 100; i++) { // this is for 100 listings
          for (let j = 0; j < 6; j++) { // 6 images per listing
            const image = [];
            const listingid = i + 1;
            // eslint-disable-next-line max-len
            const randLess10 = Math.floor(Math.random() * 30);
            const url = (j === 0) ? houseData.results[randLess10].urls.regular : interiorData.results[randLess10].urls.regular;
            const caption = faker.lorem.words(); // faker text for img captions
            const verified = Math.round(Math.random());
            image.push(listingid, url, caption, verified); // add all info to the image to the array
            images.push(image); // add the image arry to the array of all the image info
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
