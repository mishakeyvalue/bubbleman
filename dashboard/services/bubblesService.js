const fs = require('fs');
const path = require('path');
const NodeBubble = require('../../bubbleman/NodeBubble')

let collection = [];

initCollection();

module.exports.GetAll = function() {
    return collection;
};
module.exports.Get = function() {

};
module.exports.Add = function(repo, name) {

};

module.exports.Delete = function() {

};

module.exports.

/**
 * Looks throgh saved into json bubbles, restores them and pushes into in-memory collection
 * (Called just once);
 */
function initCollection() {
    let bubbleCage_path = __dirname + '/../../bubbleman/_bubbles';
    let bubbleCage = fs.readdirSync(bubbleCage_path); // get the dir as the array
    for (let i = 0; i < bubbleCage.length; i++) { // iterate through every bubble
        let p = path.join(bubbleCage_path, bubbleCage[i], '_obj.json');
        let bubble = JSON.parse(fs.readFileSync(p, 'utf8')) // create an object from saved bubble
        collection.push(new NodeBubble(bubble.GitUri, bubble.BubbleName)); // add it to the returned array
    };
}