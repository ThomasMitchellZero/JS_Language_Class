// function constructor

var john = {
    name: "John",
    yearOfBirth: 1990,
    job: "teacher",
}

// Function Constructors typically have the first letter capitalized.
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = this.calculateAge = function(){
    console.log(2016 - this.yearOfBirth);
}

Person.prototype.species = "human";

// the   new   operator  makes the .this method point to this new, empty object
// and not to the global object.

var john = new Person('john', 1990, 'teacher');

var jane = new Person('Jane', 1988, "doctor");

var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(mark.species);
console.log(mark);
