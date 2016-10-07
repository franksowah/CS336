
/* CS 336 Web Development
 * Homework01n
 * @author: Emmanuel Boye
 * @version: Fall 2017
 */

// Create a Person object to store a person's first name, last name, ID number, and start date
function Person(first, last, Id, startDate) {
	this.first = first;
	this.last = last;
	this.Id = Id;
	this.startDate = startDate;
}

// prototype method to get a persons years worked at the org.
Person.prototype.getYears = function() {
	var today = new Date();
	var birthDate = new Date(this.startDate);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

// Declare four Person variables to store in a list for the webserver to access
var Person1 = new Person("Emmanuel", "Boye", "2360875", "1991/02/15");
var Person2 = new Person("Karen ", "Cudjoe", "101456", "2005/05/28");
var Person3 = new Person("Andrew", "Gbeddy", "666666", "1984/12/31");

// Declare the employee list and push all four Person variables to it
var employeeList = [];
employeeList.push(Person1);
employeeList.push(Person2);
employeeList.push(Person3);

// Require the 'express' module and prepare it for use
var express = require('express');
var app = express();

// Send a default message to the browser when the default URL is called
app.get('/', function (req, res) {
  res.send("Hello, this webserver holds our company's employees' information!");
});

// Write out all the employees to the browser when /people URL is found
app.get('/people', function(req, res) {
	console.log('This is the list of our Employees!')
	res.json(employeeList)
});

// Write out the full record of the employee with the given ID if /person/:ID URL is found
app.get('/person/:ID', function(req, res) {
  // Search through employee list to find the user with the ID
  var counter = 0;
  while(counter < employeeList.length)
  {
    if (employeeList[counter]["Id"] == req.params["ID"])
    {
      res.json(employeeList[counter]); // Send the JSON of the user's object
      return;
    }
    counter++;
  }
	res.sendStatus(404);
});

// Write out the first and last name of the employee with the given ID if /person/:ID/name URL is found
app.get('/person/:ID/name', function(req, res) {
	var loginID = req.params.ID;
	for (i = 0; i < employeeList.length; i++) {
		if (loginID == employeeList[i].Id) {
			res.json(employeeList[i].first + " " + employeeList[i].last);
			console.log('Full name of the person with the given ID!');
			return;
		}
	}
	res.sendStatus(404);
});

// Write out how many years the employee with the given ID has worked at the company if /person/:ID/years URL is found
app.get('/person/:ID/years', function(req, res) {
	var loginID = req.params.ID;
	for (i = 0; i < employeeList.length; i++) {
		if (loginID == employeeList[i].Id) {
			var temp_years = employeeList[i].getYears();
			res.json(employeeList[i].first + " has worked here " + temp_years + " years!");
			console.log('How many years the individual worked with the organization!');
			return;
		}
	}
	res.sendStatus(404);
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
