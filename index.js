const { nextISSTimesForMyLocation } = require('./iss');



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didnt work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
// .then((result) =>{
//   printPassTimes(result);
// })
// .catch((error) => {
//   console.log("It didnt work!", error);
// })



// const exampleCoords = { latitude: '51.1564', longitude: '-114.0566' };

// fetchISSFlyOverTimes(exampleCoords,(error, passTimes) => {
//   if (error) {
//     console.log('It didnt work', error);
//     return;
//   }
//   console.log('It worked! Returned PassTimes', passTimes);
// });




// fetchCoordsByIP('199.126.38.95', (error, coordinates) => {
//   if (error) {
//     console.log('It didnt work', error);
//     return;
//   }
//   console.log('It worked! Returned Corrdinates', coordinates);
// });



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });