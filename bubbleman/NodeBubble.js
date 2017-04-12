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
        this._cageName = `_bubble0${this.BubbleName}`;
        // setting up this bubble
        this._inflateBubble();
    }

    _inflateBubble(){
        this._ensureCageExists();
        //_loadSourceCode();
        
    };

    _ensureCageExists(){
        const baseCage = path.join(__dirname,"_bubbles");
        const cage = path.join(baseCage,this._cageName);
        if(!fs.existsSync(baseCage)){
            fs.mkdirSync(baseCage);
        }
        if(!fs.existsSync(cage)){
            fs.mkdirSync(cage)
        };


        
    };

    _loadSourceCode(){

    };

    Deploy(){
        exec('dir', function(err, stdout, stderr){
            console.log(stdout)
        })
    }
}
let b = new NodeBubble();


