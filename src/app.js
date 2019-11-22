const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nimisoere"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    name: "Nimisoere"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help: Weather App",
    name: "Nimisoere",
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus autem minima reiciendis debitis dolorum, voluptas voluptatem, error beatae molestias porro nisi dignissimos consectetur quis nam rem totam, aliquid ex. Illum?"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "Please provide an address" });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help: 404",
    name: "Nimisoere",
    message: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nimisoere",
    message: "Page not found"
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
