// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

fetchCoordsByIP('199.126.38.95', (error, coordinates) => {
  if (error) {
    console.log('It didnt work', error);
    return;
  }
  console.log('It worked! Returned Corrdinates', coordinates);
});



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });