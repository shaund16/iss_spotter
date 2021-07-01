const request = require('request-promise-native');


const fetchMyIP = () => {
  return request('https://api64.ipify.org/?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}&alt=1650`;
  return request(url);
};


const nextISSTimesForMyLocation = () => {
  
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
   
};

module.exports = {  nextISSTimesForMyLocation };