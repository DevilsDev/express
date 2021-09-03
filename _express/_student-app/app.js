//!Defines a constant variable called http which is a reference to the http module.
const http = require("http");

//!Defines a constant variable called path which is a reference to the path module.
const path = require("path");

//!Defines a constant variable called express which is a reference to the express module.
const express = require("express");

//!Defines a constant variable called logger which is a reference to the morgan module
const logger = require("morgan");

//!Defines a constant variable called bodyParser which is a reference to the body-parser module.
const bodyParser = require("body-parser");

//!Defines a constant variable called app which is a reference to the express application.
const app = express();

//!Defines a constant variable called entries which is set to the value of an empty array
const entries = [];


app.locals.entries = entries;

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: false
}));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/new-entry", (req, res) => {
	res.render("new-entry");
});

app.post("/new-entry", (req, res) => {
	if (!req.body.title || !req.body.body) {
		res.status(400).send("Entries must have a title and an information body.");
		return;
	}
	entries.push({
		title: req.body.title,
		body: req.body.body,
		published: new Date(),
	});
	res.redirect("/");
});

app.use((req, res) => {
	res.status(404).render("404");
});

http.createServer(app).listen(3000, () => {
	console.log("Student example app started.");
});