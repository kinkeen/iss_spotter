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
          const CoordsByIP = {
          "latitude":  JSON.parse(body).latitude,
          "longitude": JSON.parse(body).longitude
        }
        callback(CoordsByIP);
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
      }else{ 

        const ISSflyovers = {
        "risetime":  JSON.parse(body).risetime,
        "duration": JSON.parse(body).duration
      }
      response.push(ISSflyovers)
      callback(response);
  }
  });

};

  
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};