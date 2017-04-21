"use strict";

const fs = require('fs'),
    path = require('path'),
    _PLATFORM = require('os').platform(),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    execSync = require('child_process').execSync,
    events = require('events')

const NODE_PATH = execSync('which node', { encoding: 'utf8' }).trim();

class NodeBubble {
    constructor(gitUri, bubbleName) {
        this.GitUri = gitUri;
        this.BubbleName = bubbleName;

        // defining up pathes
        this._cageName = `_bubble0${this.BubbleName}`;
        this._baseCage = path.join(__dirname, "_bubbles");
        this._cage = path.join(this._baseCage, this._cageName);
        this._src = path.join(this._cage, "_src");

        // setting up this bubble

        this._deploymentEvents = new events.EventEmitter();
        // Fires up when source code cloned / pulled
        this._deploymentEvents.on('sourced', this.sourcedHandler.bind(this));
        // Fires up when npm dependencies restored
        this._deploymentEvents.on('restored', this.restoredHandler.bind(this));

        this._inflateBubble();
    }

    // --- event handlers ---
    sourcedHandler() {
        // Job after downloading source code
        this.package_json = this._get_package_json();
        this.main = path.join(this._src, this.package_json.main);
        this._stringifyBubble();
        this._restore();
    };
    restoredHandler() {

    };
    // ---   ---
    // ************    PREPARING BUBBLE    ************

    _inflateBubble() {
        this._ensureCageExists();
        this._gitClone();
    };

    _ensureCageExists() {

        if (!fs.existsSync(this._baseCage)) {
            fs.mkdirSync(this._baseCage);
        }
        if (!fs.existsSync(this._cage)) {
            fs.mkdirSync(this._cage)
        };
        if (!fs.existsSync(this._src)) {
            fs.mkdirSync(this._src)
        };

    };

    // --- getting source code ---
    _gitClone() {
        let command = `git clone ${this.GitUri} ${this._src}`;
        let callback = this._gitCloneCallback.bind(this);
        exec(command, callback);
    };
    _gitCloneCallback(error, stdout, stderr) {
        if (error) {
            //   console.error(`******************************exec error: ${error}`);
            // console.log('********************************Pulling...')
            this._gitPull();
            return;
        }
        console.log("GIT CLONE CALL--------------------------------------------------");
        //console.log(`stdout: ${stdout}`);
        //console.log(`stderr: ${stderr}`);
        this._deploymentEvents.emit('sourced');
    };

    _gitPull() {
        let command = `git --work-tree=${this._src} --git-dir=${this._src}/.git pull origin master`;
        var callback = this._gitPullCallback.bind(this);
        exec(command, callback);
    }

    _gitPullCallback(error, stdout, stderr) {
        if (error) {
            //     console.error(`exec error: ${error}`);
            //       console.error('******AHTUNG!!1*******_gitPullCallback');            
            return;
        }
        console.log("GIT PULL CALL--------------------------------------------------");
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        this._deploymentEvents.emit('sourced');

    };
    // ---  ---

    // --- restoring npm dependencies ---
    _restore() {
        for (let dependency in this.package_json.dependencies) {
            console.log("Restoring dependency: " + dependency)
            let command = `npm install ${dependency}@${this.package_json.dependencies[dependency]} ${this._src}`;
            let callback = this._restoreCallback.bind(this);
            exec(command, callback);
        }
        //  exec(command, callback)
    };
    _restoreCallback(error, stdout, stderr) {
            if (error) {
                console.error(`******************************exec error: ${error}`);
                return;
            }
            console.log("RESOTRE CALL--------------------------------------------------");
            this._createService();
            //console.log(`stdout: ${stdout}`);
            //console.log(`stderr: ${stderr}`);
        }
        // ---   ---

    _get_package_json() {
        let p = path.join(this._src, 'package.json');
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
    _stringifyBubble() {
            let p = path.join(this._cage, "_obj.json")
            fs.writeFileSync(p, JSON.stringify(this));
        }
        // ************    ************
    start() {
        exec(`systemctl start _bubble0${this.BubbleName}`)
    };

    _createService() {
        let config = `[Unit]\nDescription=Test\n\
        [Service]\nType=simple\n\
        ExecStart=${NODE_PATH} ${this.main}\nRestart=always`;

        fs.writeFileSync(`/etc/systemd/system/_bubble0${this.BubbleName}`, config);
    };
    Stop() {
        exec(`systemctl start _bubble0${this.BubbleName}`)
    }



    get IsRunning() {
        try {
            execSync(`systemctl is-active _bubble0${this.main}`);
            return true;
        } catch (e) {
            return false;
        }
    }

    Reload() {
        return new NodeBubble(this.GitUri, this.BubbleName);
    };




}





//let BUBBLEMAN = new NodeBubble('https://github.com/mitutee/bubbleman.git', 'bubbleman');
module.exports = NodeBubble;