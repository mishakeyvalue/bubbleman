const bubbleService = require('../services/bubblesService')



module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('admin/index', {
            string: "Hello",
            NodeBubbles: bubbleService.GetAll()
        });
    })

    app.get('/webhook', function(req, res) {
        console.log(req.body)
        res.end();
    })

};