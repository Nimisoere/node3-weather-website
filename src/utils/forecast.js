const request = require("request");
require("dotenv").config();

const darkSkyURI = `https://api.darksky.net/forecast`;

const forecast = (latitude, longitude, callback) => {
  const url = `${darkSkyURI}/${process.env.DARKSKY_APIKEY}/${latitude},${longitude}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const responseMessage = `${body.daily.summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`;
      callback(undefined, responseMessage);
    }
  });
};

module.exports = forecast;
