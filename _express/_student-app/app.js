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

//!Sets app.local.entries to the value of the entries array
app.locals.entries = entries;

//!
app.use(logger("dev"));

//!Sets the views directory to the views folder
app.set("views", path.resolve(__dirname, "views"));

//! Sets the views engine to use the ejs template engine
app.set("view engine", "ejs");

//!Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({
	//!The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
	extended: false
}));

//!Creates a middleware function that renders the index page
app.get("/", (req, res) => {
	//!renders the index page
	res.render("index");
});

//!Creates a middleware function that renders the new-entry page
app.get("/new-entry", (req, res) => {
	//!renders the new-entry page
	res.render("new-entry");
});


//!Creates a post method that takes the request and response objects as parameters and adds the new entry to the entries array
app.post("/new-entry", (req, res) => {
	//!Checks if the title and content exist
	if (!req.body.title || !req.body.body) {
		//!Send a 400 status code and a message to the user with the value "Entries must have a title and an information body."
		res.status(400).send("Entries must have a title and an information body.");
		return;
	}
	//! Appends a new element to the entries array
	entries.push({
		//! Sets the title of the page to the value of req.body.title
		title: req.body.title,
		//! Sets the body of the page to the value of req.body.body
		body: req.body.body,
		//! Sets the value of published to the value of a new Date object
		published: new Date(),
	});
	//! Redirects the user to the index page
	res.redirect("/");
});

//! Creates a middleware function which is executed before the route handler.
app.use((req, res) => {
	//!Sets the status code for the response. When the code is 404 then it will render temoplate 404.ejs
	res.status(404).render("404");
});

//! Creates a new instance of the server using port 3000 and the app as the callback function.
//! And starts a server listening for connections.
http.createServer(app).listen(3000, () => {
	//! Prints a message to the console to show that the server is running.
	console.log("Student example app started.");
});