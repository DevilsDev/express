const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("app", {
		message: "Welcome to Express.js webpage.",
	});
});

http.createServer(app).listen(3000);
