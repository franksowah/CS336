
/* CS 336 Web Development
 * Homework02
 * @author: Emmanuel Boye
 * @version: Fall 2017
 */

 function getYears(dateString) {
 	var today = new Date();
 	var startDate = new Date(dateString);
 	var age = today.getFullYear() - startDate.getFullYear();
 	var m = today.getMonth() - startDate.getMonth();
 	if (m < 0 || (m === 0 && today.getDate() < startDate.getDate()))
 		age--;
 	return age
 }


// Require the 'express' module and prepare it for use
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var PEOPLE_FILE = path.join(__dirname, 'data/people.json');
var HOST = "localhost";
var PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("Hello, this webserver holds our company's employees' information.");
});

// Write out all the employees to the browser when /people URL is found
app.get('/people', function(req, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
		if (err)
			{console.error(err); process.exit(1);}
		res.json(JSON.parse(data));
	});
});

app.post('/people', function (req, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
		if (err)
			{console.error(err); process.exit(1);}
		var people = JSON.parse(data);
		var newPerson = {
			id: Date.now(),
			fname: req.body.firstName,
			lname: req.body.lastName,
			date: req.body.birthDate,
		};
		people.push(newPerson);
		fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
			if (err)
				{console.error(err); process.exit(1);}
			res.json(people);
		});
	});
});

//Write out the full record of the employee with the given ID if /person/:ID URL is found
app.route('/person/:id')
	.get(function (req, res) {
		fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err)
				{console.error(err); process.exit(1);}
			var readData = JSON.parse(data);
			var count = Object.keys(readData).length;
			for (i = 0; i < count; i++) {
				if (readData[i].id == req.params.id) {
					res.json({"content" : JSON.stringify(readData[i])});
				}
			}
		})
	})
	.post(function (req, res) {
		fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err)
				{console.error(err); process.exit(1);}
			var people = JSON.parse(data);
			var count = Object.keys(readData).length;
			for (i = 0; i < count; i++) {
				if (readData[i].id == req.params.id) {
					var new_id = readData[i].id;
				}
			}
			var newPerson = {
				id: new_id,
				fname: req.body.firstName,
				lname: req.body.lastName,
				date: req.body.birthDate,
			};
			people.push(newPerson);
			fs.writeFile(PEOPLE_FILE, function(err, data) {
				if (err)
					{console.error(err); process.exit(1);}
				res.json(people);
			})
		})
	})
	.delete(function (req, res) {
		fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err)
				{console.error(err); process.exit(1);}
			var people = JSON.parse(data);
			var count = Object.keys(readData).length;
			for (i = 0; i < count; i++) {
				if (readData[i].id == req.params.id) {
					var new_id = readData[i].id;
				}
			}
			delete people[new_id];
		})
	});

	app.get('/person/:id/:property', function (req, res) {
			fs.readFile(PEOPLE_FILE, function(err, data) {
				if (err)
					{console.error(err); process.exit(1);}
				var readData = JSON.parse(data);
				var count = Object.keys(readData).length;
				for (i = 0; i < count; i++) {
					if (readData[i].id == req.params.id) {
						if (req.params.property == "name")
							res.json(readData[i].fname + " " + readData[i].lname);
						if (req.params.property == 'years')
							res.json(getYears(readData[i].bdate));
						else
							res.sendStatus(404);
					}
				}
			})
	});

// Capture any wrong URL for this WebServer and serve up a 404 Not Found error
app.all('*', function(req, res) {
	console.log("Wrong URL or ID Number not found.")
	res.sendStatus(404);
});

// Listen on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
