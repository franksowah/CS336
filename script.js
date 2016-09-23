/**
* JavaScript constructs and Inheritance
*
* @author Emmanuel Boye (efb4)
* @version Fall2016
*/

//create a function with constructs for a person prototype
 function Person (name, birthdate){
	this._name = name
	this._birthdate = birthdate;
	this._friends = ["Yaw"];
}

//create a person protoype with different methods
Person.prototype = {
  getName(){
    return this._name;
  },
  //name mutator
  setName(newName) {
    this._name = newName;
  },
  //method to get age
  getAge(){
    var today = new Date();
    var birthdate = new Date(this._birthdate);
    var age = today.getFullYear() - birthdate.getFullYear();
    var month = today.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  },
  //method to add friend is friend is not in list already
  addFriend(newFriend){
    var i;
      for (i = 0; i < this._friends.length; i++) {
        if (this._friends[i] === newFriend){
          console.log(newFriend + " is already in list");
          return;
        }
      }
      this._friends.push(newFriend);
    },
    //method to print list of friends
    printFriends(){
      var i;
        for (i = 0; i < this._friends.length; i++) {
          console.log(this._friends[i]);
    }
  },
  //method thast prints greeting message
  printGreeting() {
    console.log("Hello my name is " + this._name + " and I am a person.")
  }
}

//test constructor
var p1 = new Person("Frank","02/15/1996");
p1.printGreeting();
console.log("Hello, my name is " + p1.getName());
console.log("I am " + p1.getAge() + " years old");

p1.addFriend("Kofi"); //test addFriend method
p1.addFriend("Kofi"); //add friend again to test if that friend will be added twice
//s1.printFriends(); Test method that prints friends

//----------------------------------------------------------------------------
//create a new function Student which will inherit off Person Class
function Student(name, birthdate, subject) {
  Person.call(this, name, birthdate);
  this._subject = subject;
}

//create student prototype object
Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function(){ //create method study
  return this._subject;
}

Student.prototype.greeting = function(){ //create method greeting
  return "\nHello my name is " + this._name + ", I am a Student!";
}

//create object to test Student inherited class
var s1 = new Student("Emma","08/28/2002", "Computer Science");
console.log(s1.greeting());
console.log("I am " + s1.getAge() + " years old"); //test parent methods, should show 14
console.log("I study " + s1.study());

console.log(s1 instanceof Student); //returns true
console.log(p1 instanceof Person); //returns true
