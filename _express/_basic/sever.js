const express = require("express");
const http = require("http");

const app = express();

app.use((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello, World!");
});

http.createServer(app).listen(3000);
