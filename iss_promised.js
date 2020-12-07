const request = require('request-promise-native');

const fetchMyIP = function(body) {
  console.log("body===" + body);
  
return request('https://api.ipify.org/?format=json/');
  /*request('https://api.ipify.org/?format=json/', (error, response, body) => {
    const data = JSON.parse(body);
    console.log("data---" + data);
    return data;
  });*/
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body);
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    const data = JSON.parse(body);
    const geoLoc = {
      latitude: data.lat,
      longitude: data.lon
    }
    return geoLoc;
  });
}
const fetchISSFlyOverTimes = function(body) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    const data = JSON.parse(body);
    const geoLoc = {
      latitude: data.lat,
      longitude: data.lon
    }
    const url = `http://api.open-notify.org/iss-pass.json?lat=${geoLoc.latitude}&lon=${geoLoc.longitude}`;
    return request(url);  
  });
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};
