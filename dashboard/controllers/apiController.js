const fs = require('fs');

module.exports = function(app){
    app.post('/api/tootee', function(req, res){       
        res.end(200);

    })
};