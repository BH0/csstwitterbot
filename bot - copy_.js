Twit = require("twit");

var config = require("./config");

var fs = require("fs");

/// Behaviours
// var posts = require("./posts");
// var streams = require("./streams");
// var gets = require("./gets")

var T = new Twit(config);

var possiblePosts = ["hi", "there", "friend"];

/*
var Status = {
    status: ["an array of statuses"],
    content_link: ["link to Codepen"],
    content_example: ["gif of Codepen result"],
    author: ["author of Codepen"]
}
*/

/*
var Status = {
    status: '#css' + Math.random()
}

var Tweet = {
    //status: '#css' + ' ' + possiblePosts[Math.floor(Math.random() * 2)] + Math.random() * 2
    status: Status.status + ' ' + possiblePosts[Math.floor(Math.random() * 2)]

}
*/

var f_json = require("./samples.json");
var First = {
    // upload image
    // post / find image
    status: "#CodePen",
    title: f_json.title,
    author: f_json.author,
    link: f_json.link
}

var image = 'images/heart.png';
var params = {
    encoding: 'base64'
}
var b64 = fs.readFileSync(image, params);
T.post('media/upload', {media_data: b64}, uploaded);

function uploaded(err, data, res) {
    var id = data.media_id_string;
    var tweet = {
        status: "" + First.status + " "+First.title+" "+First.author+" "+First.link,
        media_ids: [id]
    }
    T.post('statuses/update', tweet, tweeted);
}

function tweeted(err, data, response) {
    if (err) {
        console.log("Issue upon Tweet" + err +" "+ response);
    } else {
        console.log("Tweet posted");
    }
}
