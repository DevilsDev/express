const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
	if (req.url === "/") {
		next();
	} else if (req.url === "/throw") {
		throw new Error("Wrong path!");
	} else {
		next("You didn't visit the root!");
	}
});

app.use((req, res) => {
	res.send("Welcome to the homepage.");
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500);
	next(err);
});

app.use((err, req, res, next) => {
	res.send("Error message: " + err);
});

app.listen(3000, () => {
	console.log("App started");
});
