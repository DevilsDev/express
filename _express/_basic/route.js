const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

app.get("/", (req, res)=> {
  res.end("Welcome to my homepage!");
});

app.get("/about",(req, res) => {
  res.end("Welcome to the about page!");
});

app.get("/contacts", (req, res)=> {
  res.end("Welcome to contacts page!");
});

app.get("/hello/:who", (req, res) => {
  res.end("Hello, " + req.params.who + ".");
})

app.get("/redirect_home",(req, res)=> {
  res.redirect("/");
});

app.get("/sendnote", (req, res) => {
  const filePath = path.resolve(__dirname, "notes.txt");
  res.sendFile(filePath);
});

app.use((req, res) => {
  res.statusCode = 404;
  res.end("404!");
});

  http.createServer(app).listen(3000);
