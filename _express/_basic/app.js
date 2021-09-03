//Global constant variables  
const  express = require("express");
const log = require("morgan");
const http = require("http");

const app = express();

app.use(log("short"));

//Basic Middleware example using es6 function to detect an error message
//If it is an even minute it will give you next function "Hello, World!"
app.use((req, res, next)=> {
	const minute = new Date().getMinutes();
	if (minute % 2 === 0) {
		next();
//Else (if it is an odd number) it will display "Not authorized."
	} else {
		res.statusCode = 403;
		res.end("Not authorized.");
	}
});

//This is the next middleware that will provide a postive repsonse message
app.use((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello, World!");
});

//creates a server on port 3000
http.createServer(app).listen(3000);
