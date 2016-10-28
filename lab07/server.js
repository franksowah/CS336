/* Lab06 - Basic HTTP methods & HTML/CSS forms
 *
 * @author: Emmanuel Boye
 * @version: Fall 2016
*/

var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const PORT = 3080;
const HOST = "localhost"

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send("Hello, Lab 7!");
});

app.get("/fetch", function(req, res) {
	if(req.query.name)
    res.send({"content" : req.query.name});
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
