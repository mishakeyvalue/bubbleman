var http        = require("http"),
    terminal    = require("web-terminal");
const express = require('express');
const bubbleController = require('./controllers/bubbleController');
    

let app = express();

bubbleController(app);

app.listen(1337);
console.log("Server running at http://127.0.0.1:1337/");


console.log("Web-terminal accessible at http://127.0.0.1:1337/terminal");