/// First Draft (MVP / Prototype, only deals with "posts")

var Twit = require("twit");
var config = require("./config");
var fs = require("fs");
var T = new Twit(config);

var f_json = require("./samples.json");
var First = {
    // upload image
    // post / find image
    status: "#CodePen",
    title: f_json.submission1.title,
    author: f_json.submission1.author,
    link: f_json.submission1.link
}
console.log("O:"+First.title, First.author, First.link);

var sample_index = 0;
function mainTwitterBot() {
    var image = 'images/heart.png';
    var params = {
        encoding: 'base64'
    }
    var b64 = fs.readFileSync(image, params);
    T.post('media/upload', {media_data: b64}, uploaded);

    function uploaded(err, data, res) {
        var id = data.media_id_string;
        sample_index += 1;
        var tweet = {
            status: "Codepen" + sample_index + "#sample"+" "+First.title+" "+First.author+" "+First.link,
            media_ids: [id]
        }
        T.post('statuses/update', tweet, tweeted);
    }
}

function tweeted(err, data, response) {
    if (err) {
        console.log("Issue upon Tweet" + err +" "+ response);
    } else {
        console.log("Tweet posted");
    }
}

var wait = 2000;
setInterval(mainTwitterBot, wait);
