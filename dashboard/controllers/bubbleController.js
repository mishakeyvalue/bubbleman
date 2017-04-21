const bubbleService = require('../services/bubblesService')



module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('admin/index', {
            string: "Hello",
            NodeBubbles: bubbleService.GetAll()
        });
    })
};