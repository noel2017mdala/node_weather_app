const path = require("path");
const express = require("express");
const request = require("postman-request");
const hbs = require("hbs");
const getWeather = require("./getWeather");
const app = express();
const port = process.env.port || 8000;

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello From Handlebars",
    name: "Abel Mdala",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abel Mdala",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help me",
    name: "Abel Mdala",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please enter your address");
  }
  // res.send({
  //   address: req.query.address,
  // });
  const { address = "new york" } = req.query;
  getWeather(address, (lat, long) => {
    let url = `http://api.weatherstack.com/current?access_key=6741cd43ba6670403c7bf5ee9a59e9c4&query=-${long},${lat}`;

    request({ url, json: true, method: "GET" }, (err, { body } = {}) => {
      if (err) {
        throw err;
      }
      const data = body;
      // console.log(
      //   `${data.current.weather_descriptions[0]} your current temperature is ${data.current.temperature}. degrees and it feels like it is  ${data.current.feelslike} degrees`
      // );
      res.send({
        location: req.query.address,
        latitude: lat,
        longitude: long,
        current: data.current,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("Please provide something to search for");
  } else {
    return res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "page not found",
  });
});
app.listen(port, () => {
  console.log(`Server started on prot ${port}`);
});
