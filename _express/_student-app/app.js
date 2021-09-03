// import modules http and assign it to constant variable 
const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// assign express function to the app constant
const app = express();

const entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

// use ejs template
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

// creates a route
app.get("/", (req, res) => {
	res.render("index");
});

// creates a route to GET new entries
app.get("/new-entry", (req, res) => {
	res.render("new-entry");
});

// creates a route to update new entries
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

// middleware - if status is 404, render the 404 page
app.use((req, res) => {
	res.status(404).render("404");
});

// create a server with port 3000
http.createServer(app).listen(3000, () => {
	console.log("Student example app started.");
});
