const bubbleService = require('../services/bubblesService')

module.exports = function(app){
    app.get('/', function(req, res){
        res.end(bubbleService.GetAll());
    })
};