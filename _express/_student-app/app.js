// Requires
const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
// TODO Bodyparser comments 
const bodyParser = require("body-parser");

// Initialize express as app
const app = express();

//Define Entries global array
const entries = [];
app.locals.entries = entries;

//Sets up the HTTP request logger with 'dev' file syntax
app.use(logger("dev"));

// Sets the current directory to be the views directory
app.set("views", path.resolve(__dirname, "views"));

// Defines the renderer as ejs
app.set("view engine", "ejs");

// Body parser automatically sets the html header type.
// This argument ignores encoding the url extension
// TODO 
app.use(bodyParser.urlencoded({ extended: false }));

// Renders the index ejs file and sends it
app.get("/", (req, res) => {
	res.render("index");
});

// Renders the new-entry ejs file and sends it
app.get("/new-entry", (req, res) => {
	res.render("new-entry");
});

// If url is host:port/new-entry 
app.post("/new-entry", (req, res) => {
	// if request body has no title or body tag
	if (!req.body.title || !req.body.body) {
		// respond 400 Bad Request and send plain test message
		res.status(400).send("Entries must have a title and an information body. Please enter your bank details.");
		// exit handler
		return;
	}
	// push new entry to entires var
	entries.push({
		title: req.body.title,
		body: req.body.body,
		published: new Date(),
	});
	res.redirect("/");
});

app.use((req, res) => {
	// Default 404 returned 
	res.status(404).render("404");
});

// Create server (app) on port 3000 and log that app started
http.createServer(app).listen(3000, () => {
	console.log("Student example app started.");
});
