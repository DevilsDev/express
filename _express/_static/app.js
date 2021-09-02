const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

const publicPath = path.resolve(__dirname, "assest");
app.use(express.static(publicPath));

app.use((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("File not found!");
});

http.createServer(app).listen(3000);
