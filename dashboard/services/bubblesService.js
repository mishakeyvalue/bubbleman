const fs = require('fs');
const path = require('path');
const NodeBubble = require('C:\\Users\\mitutee\\Documents\\Programming\\bubbleman\\bubbleman\\NodeBubble.js')

module.exports.GetAll = function(){
    let collection = [];
    let bubbleCage_path = __dirname + '/../../bubbleman/_bubbles';
    let bubbleCage = fs.readdirSync(bubbleCage_path);
    for(let i = 0; i < bubbleCage.length; i++){
        let p = path.join(bubbleCage_path, bubbleCage[i], '_obj.json');
        let bubble = JSON.parse(fs.readFileSync(p,'utf8'))
        collection.push(bubble);
    };
    
    return JSON.stringify(collection);
};
module.exports.Get = function(){

};
module.exports.Add = function(repo, name){
    
};

module.exports.Delete = function(){

};