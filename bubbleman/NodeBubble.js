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
        // setting up this bubble
        this._cageName = `_bubble0${this.BubbleName}`;        
        this._baseCage = path.join(__dirname,"_bubbles");
        this._cage = path.join(this._baseCage,this._cageName);
        this._src = path.join(this._cage,"_src");
        
        this._inflateBubble();
    }

    _inflateBubble(){
        this._ensureCageExists();
        this._loadSourceCode();
        
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

    _loadSourceCode(){
        exec(`git clone ${this.GitUri} ${this._src}`, __gitCloneCallback);
    };

    Deploy(){
        exec('dir', function(err, stdout, stderr){
            console.log(stdout)
        })
    }
}


function __gitCloneCallback(error, stdout, stderr){
  if (error) {
  console.error(`exec error: ${error}`);
  console.error('AHTUNG!!1');
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
}

let bb = new NodeBubble('https://github.com/mitutee/node_Panel.git', 'test');
