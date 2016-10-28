/* Lab06 - Basic HTTP methods & HTML/CSS forms
 *
 * @author: Emmanuel Boye
 * @version: Fall 2016
 *
 * 6.1
 * a. Curl calls all HTTP methods.
 * Successful Commands:
 * curl [--head] localhost:3000/request
 * curl -X [PUT/POST/DELETE] localhost:3000/request '{"test":"10"}' -H 'Content-Type:
 * 	application/json'
 *
 * b. 400 - Bad request
 *
 * 6.2
 * a. GET and POST
 *
 * b. <form action="http://targeturl.com" method="get or post"></form>. POST and GET make sure no data is modified.
 */
var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/request', function (req, res) {
  res.status(HttpStatus.OK)
    res.send('ok');
});

app.head('/request', function (req, res) {
  res.status(HttpStatus.OK);
    res.send('ok');
});

app.post('/request', function (req, res) {
  res.send('Got a POST request. <br>Name: '
  + req.body.user_name +'<br> Email: ' + req.body.user_email +'<br> Message: ' + req.body.user_message+ '<br>');
});

app.put('/request', function (req, res) {
  res.send('Got a PUT request: ' + req.body.test);
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request: ' + req.body.test);
});

app.all('*', function(req, res) {
	res.sendStatus(400);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

});
