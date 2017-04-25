var http = require("http")
const express = require('express');
//const bubbleController = require('./controllers/bubbleController');
const apiController = require('./controllers/apiController');

let app = express();

// configure my app
app.set('view engine', 'ejs');
app.use('/assets', function(req, res, next) {
    console.log("assets were asked: " + req.url)
    express.static('public/assets')(req, res, next);
});

//---fire up controllers---
//bubbleController(app);
apiController(app);
//---  ---
app.get('/', function(req,res){res.end("I LOVE node js")})
app.listen(1337);
console.log("Server running at http://127.0.0.1:1337/");
