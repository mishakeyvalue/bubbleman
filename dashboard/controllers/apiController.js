const fs = require('fs');
const execSync = require('child_process').execSync;
module.exports = function(app){
    app.post('/api/tootee', function(req, res){       
        console.log(req)
        res.end(200);
        execSync("systemctl stop tootee");
        let command = `git --work-tree=${tootee._src} --git-dir=${tootee._src}/.git pull origin master`;
        execSync(command);
        execSync("dotnet publish -o ${tootee.production_cage}")
        execSync("systemctl start tootee");
    })
};

let tootee = {
    _src : "/usr/HangBotReborn",
    production_cage : "/var/myw/"
};