const request = require("request");
require("dotenv").config();

const mapBoxURI = "https://api.mapbox.com/geocoding/v5/mapbox.places";

const geoCode = (address, callback) => {
  const url = `${mapBoxURI}/${encodeURIComponent(address)}.json?access_token=${
    process.env.MAPBOX_APIKEY
  }`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to loaction service");
    } else if (body.features.length === 0) {
      callback("Unable to find location");
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geoCode;
