const faker = require('faker');
const fs = require('fs');
const { performance } = require('perf_hooks');

// const writeUsers = fs.createWriteStream('no_ImageID.csv'); // names the file to write to

const writeUsers = fs.createWriteStream('./server/no_Image_ID.csv'); // names the file to write to

writeUsers.write('listing_id, ImageID, ImageUrl, Caption, Verified\n', 'utf8'); // creates column clables and encodes // doesn't have ImageID

const imageNum = () => {
  const ranNum = Math.ceil(Math.random() * 899);
  return ranNum.toString().padStart(3, '0');
};

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000; // the amount of times this function will run...
  let listing_id = 0; // this will be the primary data point
  let innerCounter = 0;
  let ImageID = 1;
  function write() {
    let ok = true;
    do {
      const ImageUrl = 'https://sdcimages0001.s3-us-west-1.amazonaws.com/images2/databaseimg' + imageNum() + '.jpg';
      const Caption = "'" + faker.lorem.words() + "'";
      const Verified = Math.round(Math.random());

      const data = `${listing_id}, ${ImageID}, ${ImageUrl},${Caption}, ${Verified}\n`; // with out ImageID since this should be handled by postgresql as this column is seral


      innerCounter ++;
      ImageID ++;

      if (innerCounter % 3 === 0) {
        i -= 1; // decreases the counter
        listing_id += 1; // increases the primary ID
        if (listing_id % 200000 === 0) {
          console.log(listing_id.toLocaleString('en'));
        }
      }

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

const t0 = performance.now();

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
  const t1 = performance.now();
  console.log("Call to writeTenMillionUsers took " + (t1 - t0) + " milliseconds.")
});
