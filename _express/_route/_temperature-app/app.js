const path = require("path");
const express = require("express");
const zipdb = require("zippity-do-dah");
const ForecastIo = require("forecastio");

const app = express();
const weather = new ForecastIo("YOUR FORECAST.IO API KEY HERE");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.get(/^\/(\d{5})$/, (req, res, next) => {
	const zipcode = req.params[0];
	const location = zipdb.zipcode(zipcode);
	if (!location.zipcode) {
		next();
		return;
	}

	const latitude = location.latitude;
	const longitude = location.longitude;

	weather.forecast(latitude, longitude, (err, data) => {
		if (err) {
			next();
			return;
		}

		res.json({
			zipcode: zipcode,
			temperature: data.currently.temperature,
		});
	});
});

app.use((req, res) => {
	res.status(404).render("404");
});
app.listen(3000);
