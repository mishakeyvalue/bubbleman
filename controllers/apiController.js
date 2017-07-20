let execSync = require('child_process').execSync
let fs = require('fs');

const DELIVERY_FILE_PATH = "./panelDeliveryFile.txt";

let controller = function(app){
    app.post('/api/panel', function(req, res){
        res.end(200);
        deliverPanel();
    });

    app.get('/api/panel', function(req, res){
        res.send(200);
        deliverPanel();
    });
};

function deliverPanel(){
    fs.readFile(DELIVERY_FILE_PATH, 'utf8', function(err, data){
        if (err) throw err;
        console.log(execSync(data, { encoding: 'utf8' }))
    });
};

module.exports = controller;