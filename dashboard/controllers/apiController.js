const fs = require('fs');
const execSync = require('child_process').execSync;
module.exports = function(app){
    app.post('/api/tootee', function(req, res){       
//        console.log(req)
        res.end('200');
        execSync("systemctl daemon-reload");
        execSync("systemctl stop tootee");
        let command = `git --work-tree=${tootee._src}/../ --git-dir=${tootee._src}/../.git pull origin master`;
        execSync(command);
	execSync(`git --work-tree=${tootee._src} --git-dir=${tootee._src}/../vk-dotnet/.git pull origin master`);
//	execSync(`dotnet restore ${tootee._src}/`);
	console.log(`dotnet publish -o ${tootee.production_cage}`)
        execSync(`dotnet publish -o ${tootee.production_cage}`, {cwd:tootee._src})
        execSync("systemctl start tootee");
    })
};

let tootee = {
    _src : "/usr/HangBotReborn/HangBotReborn",
    production_cage : "/var/myw/"
};
