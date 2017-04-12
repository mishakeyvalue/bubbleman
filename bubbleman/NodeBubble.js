"use strict";

const fs        = require('fs'),
      path      = require('path'),
      _PLATFORM = require('os').platform(),
      spawn     = require('child_process').spawn,
      exec      = require('child_process').exec


class NodeBubble{
    constructor(gitUri,bubbleName){
        this.GitUri = gitUri;
        this.BubbleName = bubbleName;

        // defining up pathes
        this._cageName = `_bubble0${this.BubbleName}`;        
        this._baseCage = path.join(__dirname,"_bubbles");
        this._cage = path.join(this._baseCage,this._cageName);
        this._src = path.join(this._cage,"_src");
 
        // setting up this bubble        
        this.package_json =  this._inflateBubble();
    }

    _inflateBubble(){
        this._ensureCageExists();
        this._gitClone();
        return this._get_package_json();        
    };

    _ensureCageExists(){

        if(!fs.existsSync(this._baseCage)){
            fs.mkdirSync(this._baseCage);
        }
        if(!fs.existsSync(this._cage)){
            fs.mkdirSync(this._cage)
        };
        if(!fs.existsSync(this._src)){
            fs.mkdirSync(this._src)
        };
        
    };

    _gitClone(){
        let command = `git clone ${this.GitUri} ${this._src}`;
        let callback = this._gitCloneCallback.bind(this);
        exec(command, callback);
    };
    _gitCloneCallback(error, stdout, stderr){
        if (error) {
        console.error(`exec error: ${error}`);
        console.error('AHTUNG!!1');
            this._gitPull();
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    };
    _gitPull(){
        let command = `git --work-tree=${this._src} --git-dir=${this._src}/.git pull origin master`;
        var callback = this._gitPullCallback.bind(this)
        exec(command, callback);
    }

    _gitPullCallback(error, stdout, stderr){
        if (error) {
        console.error(`exec error: ${error}`);
        console.error('AHTUNG!!1');
            this._
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    };
    _get_package_json(){
        let p = path.join(this._src, 'package.json');
        return JSON.parse(fs.readFileSync(p,'utf8'));        
    }

    Deploy(){
        exec('dir', function(err, stdout, stderr){
            console.log(stdout)
        })
    }
}




let bb = new NodeBubble('https://github.com/mitutee/node_Panel.git', 'test');
