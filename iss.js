const request = require('request');
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
//  const fetchISSFlyOverTimes = function(coords, callback) {
//   // ...
// };









/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const latitude = JSON.parse(body).latitude.toString();
    const longitude = JSON.parse(body).longitude.toString();
    let output = {
      latitude,
      longitude
    };
  
    callback(null,output);
  });
};


// const fetchMyIP = (callback) => {
//   request('https://api64.ipify.org/?format=json', (error, response, body) => {
//     //error can be set if invalid domain, user is offline, etc
//     if (error) {
//       callback(error, null);
//     }

//     //if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

module.exports = {  fetchCoordsByIP };
//export other function