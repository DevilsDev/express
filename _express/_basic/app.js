const express = require("express"); // Use express.js module
const log = require("morgan"); 		// Use morgan module
const http = require("http");		// Use http module

const app = express(); // Create express.js app

app.use(log("short")); // Log acitivty

app.use((req, res, next)=> { // Request, Response, Next function
	const minute = new Date().getMinutes(); // Create a constant that holds the current time minutes. 
	if (minute % 2 === 0) { // If the current time minutes remainder of 2 equals 0
		next(); // Continue to the next function
	} else { // Otherwise
		res.statusCode = 403; // Provide the error code
		res.end("Not authorized."); // End the response providing the reason
	}
});

app.use((req, res) => { // Rquest, Response
	res.writeHead(200, { "Content-Type": "text/plain" }); // Create a call back handler request, status code 200, content type plain text
	res.end("Hello, World!"); // End the response providing the reason
});

http.createServer(app).listen(3000); // Create application using port 3000 on an local http server
