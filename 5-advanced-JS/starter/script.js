/* 

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

 ////  5.63  Object.create  ////////

 var personProto = {
     calculateAge: function(){
         2016 - this.yearOfBirth;
     }
 };


 // If you pass .create() an argument, it uses that as the prototype.
 var john = Object.create(personProto);

 john.name = 'John';
 john.yearOfBirth = 1990;
 john.job = 'teacher';

// It's kind of like the reverse of the function constructor.  Here,
// the prototype is easy to specify and the functions are passed in.  
 
var jane = Object.create(personProto,{
    name: { value: 'Jane' },
    yearOfBirth: { value:1969 },
    job: {value: "Nurse"},

});

*/

//// Section 5.64 Primitives vs. objects

var a = 23;
var b = a;
a = 46;

console.log(a,b);

//returns two different values because variable actually hold the values
//of primitives.  Mutating  a  does not affect  b  because  b  is actually
// holding its own value.

var obj1 = {
    name: 'John',
    age: 26,

}

var obj2 = obj1;

obj1.job = 'teacher';

console.log(obj1.job, obj2.job)

// this is not the case for objects.  obj2 does not contain a separate
// instance of obj1.  They both point at the same place so when one
// changes, both change.  

var age = 27;

var obj = {
    name: 'Jonas',
    city: 'Lisbon',
};


// b.city will change because it's just a pointer to the .city property of obj.
// However, age remains unchanged.  We just created a new variable called a
// whose value is never read.  To change the orginal, we would have to say
// age = 30;

function change(a,b){
    a = 30;
    b.city = "San Francisco";
}

change(age, obj);

console.log(age, obj.city);