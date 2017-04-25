var http = require("http")
const express = require('express');
const bubbleController = require('./controllers/bubbleController');
<<<<<<< HEAD
const apiController = require('./controllers/apiController');
    
=======
const wetty = require('./wetty/app');

>>>>>>> 2ec45740164aaa1e8bca2bde4c6855a6daa4021d

let app = express();

// configure my app
app.set('view engine', 'ejs');
app.use('/assets', function(req, res, next) {
    console.log("assets were asked: " + req.url)
    express.static('public/assets')(req, res, next);
});

//---fire up controllers---
bubbleController(app);
apiController(app);
//---  ---
app.listen(1337);
console.log("Server running at http://127.0.0.1:1337/");