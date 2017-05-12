const fs = require('fs');
const execSync = require('child_process').execSync;
module.exports = function(app){
    app.post('/api/tootee', function(req, res){       
//        console.log(req)
        res.end('200');
	tootee.reload();
    });
   app.get('/api/tootee', function(req, res){       
	console.log(req);
        res.end('200');
	tootee.reload();
    });
        app.post('/api/botman', function(req, res){       
//        console.log(req)
//        res.end('200');
//	botman.reload();
    });
   app.get('/api/botman', function(req, res){       
	console.log(req);
//        res.end('200');
//	botman.reload();
    });
   app.post('/api/woommeewp',woommewpCB);
   app.get('/api/woommeewp',woommewpCB);
   app.post('/api/cdriver',cdriverCB);
   app.get('/api/cdriver',cdriverCB);
};
function woommewpCB(req,res){
	woommee_wp.reload();
	res.end('200');
};
function cdriverCB(req,res){
	cdriver.reload();
	res.end('200');
};
let tootee = {
    _src : "/usr/HangBotReborn/HangBotReborn",
    production_cage : "/var/myw/",
    reload : function() {
        execSync("systemctl daemon-reload");
        execSync("systemctl stop tootee");
        let command = `git --work-tree=${tootee._src}/../ --git-dir=${tootee._src}/../.git pull origin master`;
        execSync(command);
	execSync(`git --work-tree=${tootee._src} --git-dir=${tootee._src}/../vk-dotnet/.git pull origin master`);
//	execSync(`dotnet restore ${tootee._src}/`);
	console.log(`dotnet publish -o ${tootee.production_cage}`)
        execSync(`dotnet publish ${tootee._src}/HangBotReborn.csproj -o ${tootee.production_cage}`)
        execSync("systemctl start tootee");
    }
};
let botman = {
    _src : "/usr/vk-dotnet-bot/Botman_Web",
    production_cage : "/var/botman/",
    reload : function() {
        execSync("systemctl daemon-reload");
        execSync("systemctl stop botman");
        let command = `git --work-tree=${botman._src}/../ --git-dir=${botman._src}/../.git pull origin master`;
        execSync(command);
	execSync(`git --work-tree=${botman._src} --git-dir=${botman._src}/../vk-dotnet/.git pull origin master`);
//	execSync(`dotnet restore ${tootee._src}/`);
	console.log(`dotnet publish -o ${botman.production_cage}`)
        execSync(`dotnet publish ${botman._src}/Botman_Web.csproj -o ${botman.production_cage}`)
        execSync("systemctl start botman");
    }
};
let woommee_wp = {
    _src : "/var/woommee_wp",
    reload : function() {
        execSync("systemctl daemon-reload");
        execSync("systemctl stop woommee_wp");
        let command = `git --work-tree=${this._src} --git-dir=${this._src}/.git pull origin master`;
        execSync(command);
        execSync("systemctl start woommee_wp");
    }
};

let cdriver = {
    _src : "/var/cdriver",
    reload : function() {
        execSync("systemctl daemon-reload");
        execSync("systemctl stop cdriver");
        let command = `git --work-tree=${this._src} --git-dir=${this._src}/.git pull origin master`;
        execSync(command);
        execSync("systemctl start cdriver");
    }
};
