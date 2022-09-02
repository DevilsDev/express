// import path 
// ANCHOR: import path
const path = require("path");
// import express
const express = require("express");
// import zippity-do-dah 
const zipdb = require("zippity-do-dah");
// import  forecastio
const ForecastIo = require("forecastio");

// init instance of express as app 
const app = express();
// init instance of forecastio with unique api key 
const weather = new ForecastIo("YOUR FORECAST.IO API KEY HERE");


// establish public as directory to serve from
// ANCHOR: using path.resolve method
app.use(express.static(path.resolve(__dirname, "public")));

// establish views directory path
// ANCHOR: using path.resolve method 
app.set("views", path.resolve(__dirname, "views"));
// establish express view engine support for .ejs format
app.set("view engine", "ejs");

// root renders index.ejs
app.get("/", (req, res) => {
	res.render("index");
});

// some regex to decipher api call
app.get(/^\/(\d{5})$/, (req, res, next) => {

	// establish variables to use as args in .forecast() method
 	const zipcode = req.params[0];
	const location = zipdb.zipcode(zipcode);
	if (!location.zipcode) {
		next();
		return;
	}

	const latitude = location.latitude;
	const longitude = location.longitude;

	// call .forecast() method with args defined above
	weather.forecast(latitude, longitude, (err, data) => {
		// error
		if (err) {
			next();
			return;
		}
		// format and return response as a json
		res.json({
			zipcode: zipcode,
			temperature: data.currently.temperature,
		});
	});
});

// establish 404 view render when needed
app.use((req, res) => {
	res.status(404).render("404");
});
app.listen(3000);
