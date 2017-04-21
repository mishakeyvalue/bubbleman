const bubbleService = require('../services/bubblesService')



module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('admin/index', {
            string: "Hello",
            NodeBubbles: bubbleService.GetAll()
        });
    })

    app.post('/webhook', function(req, res) {
        // console.log(req.body)
        reloadSelf();
        res.end();
    })

};


let reloadSelf = function() {
    let command = `git --work-tree=/usr/bubbleman --git-dir=/usr/bubbleman/.git pull origin master`;
    try {
        execSync(command);
    } catch (e) {
        console.log(e)
    }
};

let setAutolaunchSelf = function() {
    let config = `[Unit]\nDescription=Test\n\
        [Service]\nType=simple\n\
        ExecStart=${NODE_PATH} ${__filename}/dashboard/app.js\nRestart=always`;

    fs.writeFileSync(`/etc/systemd/system/_bubbleman`, config);
}