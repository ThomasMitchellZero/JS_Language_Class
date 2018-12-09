

/*
var  firstName = "John";
var lastName = 'Smith';
var age = 28;
var fullAge = true;

var job;

//type coercion

console.log(firstName + " " + age);

var job, isMarried;
job = 'teacher';
isMarried = true;

console.log(firstName + " " + "is a " + job + ". Is he married? "+ isMarried);

// variable mutation //

age = "twenty-eight";
job = 'driver';
alert(firstName + " " + "is a " + job + ". Is he married? "+ isMarried);

var lastName = prompt("Last name?");

console.log(firstName + " " + lastName);

// Logical operators
var now = 2018;
var ageJohn = 28;
var ageMark = 33;
var fullAge = 18




// So johnOlder just contains the Boolean value of running this operation.
var johnOlder = ageJohn > ageMark;

console.log(johnOlder);


console.log(typeof ageJohn);

*/



var now = 2018
var yearJohn = 1989;
var fullAge = 18;

var isFullAge = now - yearJohn >= 18;

console.log(isFullAge);

// Multiple Assignments

var x; y;

// This works because not all operations are left to right.  For instance,
// assigment (a = b) happens right-to-left.
x = y = 2+3+4;

// this format just produces an error:  4+6+6 = a = b;


console.log(x,y);