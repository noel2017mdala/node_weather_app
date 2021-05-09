const request = require("postman-request");
const getWeather = (location, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiYWJlbG1kYWxhIiwiYSI6ImNrbzJvZ2t2dzBrY2Uyb2x5Z3dsMnB6b2MifQ.vX4NSHWm5YCQeVnFfC8fXw`;
  request({ url, json: true, method: "GET" }, (err, { body } = {}) => {
    if (err) {
      throw err;
    } else if (body.message) {
      console.log("Please enter your location name");
    } else if (body.features.length === 0) {
      console.log(
        "Mhh 😕 sorry we cant find your exact location please try another search"
      );
    } else {
      let [long, lat] = body.features[0].center;
      callback(lat, long);
    }
  });
};

module.exports = getWeather;
