const express = require('express');

let app = express();

var opts = require('optimist')
    .options({
        port: {
            demand: false,
            alias: 'p',
            description: 'port to listen to'
        },
    }).boolean('allow_discovery').argv;
let PORT;
if (opts.port) {
    PORT = opts.port;
} else PORT = 5555;

const apiController = require('./controllers/apiController');

apiController(app);


app.listen(PORT); console.log("App is listening on the port " + PORT);