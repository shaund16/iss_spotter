const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };



const fetchMyIP = (callback) => {
  request('https://api64.ipify.org/?format=json', (error, response, body) => {
    //error can be set if invalid domain, user is offline, etc
    if (error) {
      callback(error, null);
    }

    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


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


const fetchISSFlyOverTimes = function(coords, callback) {
  
  const url = `http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}&alt=1650`;
  
  request(url,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching for Duration and RiseTime: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



















