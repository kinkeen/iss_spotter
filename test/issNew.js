// iss.js
const request = require('request');


const fetchMyIP = function(callback) {
  
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
request(`http://ip-api.com/json/${ip}`, (error, response, body) => {

  if (error) {
    callback(error, null);
    return;
  }

  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
    callback(Error(msg), null);
    return;
  }

  const data = JSON.parse(body);
  const geoLoc = {
    latitude: data.lat,
    longitude: data.lon
  }

  callback(null, geoLoc);

  });
};
  
const fetchISSFlyOverTimes = function(coords, callback) {
  
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  
   });

};

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

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};