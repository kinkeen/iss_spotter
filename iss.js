// iss.js
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(fetchMyIP, callback) {

    request('https://api.ipify.org?format=json', (error, response, body) => {
  
      if (error) return callback(error, null);

        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }else{ 
        
        const { latitude, longitude } = JSON.parse(body).data;
        callback(null, { latitude, longitude });
    }
    });

};
  

const fetchISSFlyOverTimes = function(coords, callback) {
  //"response": [{"risetime": TIMESTAMP, "duration": DURATION}]

  const response = [{
    "risetime": "",
    "duration": ""
   }];

  request('http://api.open-notify.org/iss-now.json', (error, response, body) => {
  
    if (error) return callback(error, null);

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
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