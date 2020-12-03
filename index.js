// index.js

const { fetchMyIP,fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});



fetchCoordsByIP ((error, fetchMyIP) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned Coords By IP:' , CoordsByIP);
});



  
  
