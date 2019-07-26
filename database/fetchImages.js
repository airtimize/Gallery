const axios = require('axios');
const fs = require('fs');

// const countLow = 10;
// const countHigh = 60;

// let fetchImage = (countLow, CountHigh ) => {
//   for (let i = countLow; i < CountHigh; i++) {
//     axios({
//       method: 'get',
//       url: 'https://loremflickr.com/320/240/house',
//       responseType: 'arraybuffer',
//       responseEncoding: 'binary',
//     })
//       .then((response) => {
//         fs.writeFile(__dirname+'blah0' + i +'.jpg', response.data, 'binary', () =>{console.log('done')});
//         console.log('success');
//       })
//       .catch((err) => {
//         console.log('err ', err);
//       });

//     if (i === CountHigh - 1) {
//       countLow += 50;
//       countHigh += 50;
//     }
//   }
// };

// setInterval(fetchImage(countLow, CountHigh), 900000);


for (let i = 500; i < 901; i++) {
  axios({
    method: 'get',
    url: 'https://loremflickr.com/320/240/house',
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  })
    .then((response) => {
      fs.writeFile(__dirname+'img' + i +'.jpg', response.data, 'binary', () =>{console.log('done')});
      console.log('success');
    })
    .catch((err) => {
      console.log('err ', err);
    });
}
