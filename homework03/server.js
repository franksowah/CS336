
/* CS 336 Web Development
 * Homework03
 * @author: Emmanuel Boye
 k* @version: Fall 2017
 */

// Require the 'express' module and prepare it for use
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var dbConnection;

MongoClient.connect('mongodb://cs336:bjarne@ds151137.mlab.com:51137/cs336', function (err, db) {
	if (err) throw err;
  dbConnection = db;
})

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest people.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Write out all the employees to the browser when /people URL is found
app.get('/people', function(req, res) {
  var collection = dbConnection.collection('people');
  collection.find({}).toArray(function(err, docs) {
      if (err) throw err;
      res.json(docs);
  });
});

//show list of people in the database
app.post('/people', function (req, res) {
  var collection = dbConnection.collection('people');
		var newPerson = {
			id: Date.now(),
			fname: req.body.firstName,
			lname: req.body.lastName,
			date: req.body.startDate,
		};
    collection("people").insertOne(newCPerson, function(err, result) {
        if (err) throw err;
        collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});


//POST method to create new people
app.post('/people', function(req, res) {

	var fname = req.body.firstname;
	var lname = req.body.lastname;
	var login = Number(req.body.id);
	var date = req.body.startdate;

	//If data is missing dont create person
	if(fname == '' || lname == '' || login == '' || date == '') {
		console.log("Some data is missing.");
		console.log("Can't create Person.");
		res.sendStatus(409);
		return;
	}
    //Check if the login ID is already in the database
  	var newPerson = { firstname: fname, lname: last, id: login, startdate: date};

    //We have check if the Person is already in the database
  	var collection = dbConnection.collection('people');
    var counter = collection.find({"id": login});

    //Check if the Person is already in the database.
    counter.toArray(function(err, docs) {
      if(docs.length > 0) {
        console.log("That Person already exists!");
        console.log(docs[0]);
      } else {
        collection.insert(newPerson);
      }
    });
  });

//Write out the full record of the employee with the given ID if /person/:id URL is found
app.get("/person/:id", function (req, res) {
  var id = Number(req.params.id);
  var collection = dbConnection.collection('people');

  var counter = collection.find({"id": id});
  counter.toArray(function(err, docs) {
    if(docs.length == 0) {
      res.sendStatus(404);
    } else {
      res.json(docs);
    }
  });
});


app.get('/person/:id/name', function(req, res) {
  var id = Number(req.params.id);//
  var collection = dbConnection.collection('people');
  var counter = collection.find({"id": id});
  counter.toArray(function(err, docs) {
    if(docs.length == 0) {
      res.sendStatus(404);
    } else {
      res.send(docs[0].firstname + " " + docs[0].lastname);
    }
  });
});

app.get('/person/:id/years', function(req, res) {
   var todayDate = new Date();
   var startDate, years, calcDate;

   var id = Number(req.params.id);
   var collection = dbConnection.collection('people');
   var counter = collection.find({"id": id});
   counter.toArray(function(err, docs) {
     if(docs.length == 0) {
       res.sendStatus(404);
     } else {
       //calculate and send the years person has worked
       startDate = docs[0].startdate;
       calcDate = new Date(startDate);
       years = todayDate.getFullYear() - calcDate.getFullYear();
       var month = todayDate.getMonth() - calcDate.getMonth();
       if (month < 0 || (month === 0 && todayDate.getDate() < calcDate.getDate())) {
         years--;
       }
       res.send("Years: " + years.toString());
     }
   });
 });

 app.get('/person', function(req, res) {
		var id = Number(req.query.personID);
    var collection = dbConnection.collection('people');
    var counter = collection.find({loginID: id});

    counter.toArray(function(err, docs) {
      if(docs.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(docs);
      }
    })
});

app.put('/person/:id/:first', function(req, res) { //test with CURL
  var id = Number(req.params.id);
  var newName = req.params.first;

  var collection = dbConnection.collection('people');
  var counter= collection.find({"id": id});

  counter.toArray(function(err, docs) {
    if(docs.length == 0) {
      res.sendStatus(404);
    } else {
      collection.update({"id": id}, { $set: {firstname: newName } });
      res.sendStatus(201);
    }
  });
});

app.delete('/person/:id', function(req, res) { //test with CURL
  var id = Number(req.params.id);
  var collection = dbConnection.collection('people');
  var counter = collection.find({"id": id});

  counter.toArray(function(err, docs) {
    if(docs.length == 0) {
      res.sendStatus(404);
    } else {
      collection.remove({"id": id});
      res.sendStatus(200);
    }
  });
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
