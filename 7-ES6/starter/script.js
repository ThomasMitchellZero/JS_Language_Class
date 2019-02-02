// 7.104   let and const


/*

// ES5
// variables declared with var are function-scoped
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);


// ES6
// variables declared with  const  and  let  are block-scoped.
const name6 = 'Jane Smith';
let age6 = 23;
// trying to mutate the value of a constant throws an error.
name6 = 'Jane Miller'
console.log(name6);


// ES5

function driversLicense5(passedTest){
    if(passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;

    };
    console.log(firstName + yearOfBirth);
};

driversLicense5(true);


// const and let are block-scoped, which means they are only accessible within the curly braces that enclose where they are declared.  They CAN be accessed by any block within that scope, but they are unreachable from the outside.

function driversLicense6(passedTest){
    
//  trying to call a variable before it is defined throws an error instead of returning  undefined.  
//  console.log(firstName);
    let firstName;
        const yearOfBirth = 1990;
    
    if(passedTest){
        firstName = 'John';

    };
    console.log(firstName + yearOfBirth);
};

driversLicense6(true);


// This will print numbers from 1-4, and then 23.  The  i  defined within the parentheses is considered a different  i  from the one outside them.  If I changed the lets to vars, the last line would print 5.  
let i = 23;

for(let i = 0; i < 5; i++){
    console.log(i)
}

console.log(i)




// 7.105  IIFEs and ES6

// in ES6, if I want to protect data, all I have to do is use let and const and store data in blocks - between 2 curly braces.
{
    const a = 1;
    let b = 2;
}

console.log(a+b);

// 7.106 Strings in ES6

let firstName = 'John';
let lastName = 'Smith';

const yearOfBirth = 1990;

function calcAge(year){
    return 2019 - year;
} 

let str = `${firstName} of the house of ${lastName} is now ${calcAge(yearOfBirth)} years old.`

console.log(str);

const n = `${firstName} ${lastName}`;

console.log(n.startsWith('J'));
console.log(n.endsWith('h'));
console.log(n.includes('og'))




// 7.107 Arrow Functions ////

const years = [1990, 1965, 1982, 1937];


// ES5
var ages5 = years.map(function(el){
    return 2019 - el;
})

console.log(ages5);

let ages6 = years.map(el => 2016 - el);

console.log(ages6);

ages6 = years.map((el, index)=> `Age element is ${index +1}: ${2019 - el}`);

console.log(ages6);


// 7.108 Arrow Functions 2 ////

//ES5

var box5 = {
    color:'green',
    position: 1,
    clickMe: function(){
        // this works as expected.  this  points to the top object because it is called by a method.
        console.log(this.color);
        // if we replace all instances of this in the callback with self, it will now work as expected.
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            // this won't work.  The reason is that this call is not considered part of the method.  It's treated as a regular function call, so it points to the global object instead.  For the .color and .position values, all we get is   undefined.
            var str = `This is a ${this.color} box in position ${this.position}`;
            alert(str);
        })
    }
}

//box5.clickMe();


const box6 = {
    color:'green',
    position: 1,
    clickMe: function(){

        document.querySelector('.green').addEventListener('click', ()=> {
            // The arrow function works different.  It does use   this   as expected, pointing at the box6 object.  I don't know the rules for why this is.
            var str = `This is ${this.color} box in position ${this.position}`;

            alert(str);
            console.log(a);
        });
    }
}

box6.clickMe();


// 7.109  Destructuring ////


// ES5



var john = ['John', 26];
var name = john[0];
var age = john[1];


// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

// this pattern can assign a bunch of variables at once.  Basically, running the function is run and returns an array.  Those values are assigned to the variable names with the same index as the returned values.  So   retirement  which is the second argument, gets assigned the value of 65 - age.

const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);





// ES5

const boxes = document.querySelectorAll('.box');

// this is necessary because   boxes   does not get an array from the HTML - instead it gets a node list.  Below is a hack to turn it into an array.

var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
})

--

var boxesArr5 = Array.prototype.slice.call(boxes);

for(i=0; i < boxesArr5.length; i++){
    if (boxesArr5[i].className === 'box blue'){
        continue
    } else {
        boxesArr5[i].textContent = 'I blue myself'
    }
}


//ES6

const boxesArr6 = Array.from(boxes);

boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// this is a   for of   loop.  AFAICT the difference is that we can use   continue   and   break   statements, which we cannot do in forEach or .map

for(const cur of boxes){
    if (cur.className.includes('blue')){
        continue;
    } else {
        cur.textContent = 'I blue myself'
    }
}


// 7.110 Arrays ////////



var ages = [12, 17, 8, 1, 14, 19];


// ES5

var ofAge = ages.map(function(cur){
    return cur >= 18;
})

console.log(ofAge);

console.log(ofAge.indexOf(true));
console.log(ages[ofAge.indexOf(true)]);

// ES6
// this returns the index of the (AFAICT) first element for which the function is true.  
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));


// 7.11 Spread Operator ////////

function addFourAges(a, b, c, d){
    return a + b + c + d;
}

var sum1 = addFourAges(18,30,12,21);

console.log(sum1);

//ES5
var ages = [18,30,12,21];

// the .apply method passes elements of an array into a function as arguments.  The first argument is set to null, but it would allow us to specify where our   this  variable would point.  
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6

// the ... operator expands an array into its elements.
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];

console.log(bigFamily);

// Spread operator also works for selecting array-like things, such as HTML elements.

// Select all h1 headers
const h = document.querySelector('h1');

// select anything with the class of .box
const boxes = document.querySelectorAll('.box');

// make them into one array-like construction.
const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');

//// 7.112  Rest parameters ////////

// Rest parameters allow you to pass an arbitrary number of parameters into a function instead of a fixed number.  


// ES5
function isFullAge5(){
    //the list of arguments we get looks like an array, but it is actually an object.  We have to turn it into an actual array before we can use array methods like   .forEach   on it.
    var argsArray = Array.prototype.slice.call(arguments);
    argsArray.forEach(function(cur){
        console.log((2019 - cur) >=18)
    })
}

//isFullAge5(1990, 2009, 1965);

//ES6

// the spread operator ( aka  ... ) turns the input parameters into an array as soon as they are passed to the function.  

function isFullAge6(...years){
    years.forEach(cur => console.log((2019 - cur) >=18))
}

isFullAge6(1990, 2009, 1965);

// ES5

// we've created a parameter,  limit  , that we want so the user can input their age.  However, the problem is that it would normally get thrown into the years array.


function isFullAge5(limit){

    // by passing this a second argument of 1, we'll start slicing at position 1, not position 0.  That way we can exclude the first argument (which is the age of maturity)
    var argsArray = Array.prototype.slice.call(arguments, 1);
    argsArray.forEach(function(cur){
        console.log((2019 - cur) >= limit)
    })
}

//isFullAge5(21, 1990, 2009, 1965);

//ES6


// With ES6, no position fuckery is necessary.  You can input any necessary variables as normal, and use the ...  operator to designate where you expect your unlimited parameters.

function isFullAge6(limit, ...years){
    years.forEach(cur => console.log((2019 - cur) >= limit))
}

isFullAge6(21, 1990, 2009, 1965, 2014);


//// 7.113 Default Parameters

//ES5

function SmithPerson(firstName, yearOfBirth, lastName, nationality){
    

    // You have to explicitly define default parameters in ES5.

    lastName === undefined? lastName = 'Smith' : lastName = lastName;
    nationality === undefined? nationality = 'American' : nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;

}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

console.log(john);
console.log(emily);

//ES6

// in ES6, if you set the parameter = something in the function constructor, that will be its default value.
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;

}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

console.log(john);
console.log(emily);



//// 7.114 - Maps ////////

const question = new Map();

// the key does not have to be a string like it does with an object.
question.set('question', 'What is the official name of the latest official JS version?')
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set('correct', 3);
question.set(true, "Correct Answer!");
question.set(false, "Wrong answer!");

// .get retrieves the value of a particular element.  
console.log(question.get('question'));

// .has  checks to see if there is a particular key
//if(question.has(4)){console.log('4 is here');};

// .clear  clears everything.
//question.clear();

// Maps are actually iterable, so we can do forEach loops on them like objects.


question.forEach((value, key) => console.log(`This is ${key} and its value is: ${value}`))


//////////////

// AFAICT, the [] lets you define two variables at once, and  .entries gives access to the key/value pairs of the map.  
for(let [key, value] of question.entries()){
    
    if(typeof(key) === 'number'){
        console.log(`Answer${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write number of your guess'));

// this is pretty slick.  question.get(x) retrieves the value with the key of x.  In this case, we're checking to see if   ans   that we got from the prompt window === the value stored in the  'answer'  key.  If it does, then it will grab the value stored at the boolean  true  and if not, it will get the value stored at boolean  false   .  This would only work with maps because maps lets you use all primitive types as keys.    


console.log(

    question.get(ans === question.get('correct'))

);

//// 7.115 - Classes ////////

// ES5

var Person5 = function(name, yearOfBirth, job){
    this.firstName = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function(){
    
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);

}

var john5 = new Person5('John', 1995, 'teacher');


// ES6

class Person6 {

    // looks like we have to define the constructor
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    // no commas or semi-colons.  We also don't have to write Person6.prototype  but other than that I don't see any real benefit to using classes.
    calculateAge(){
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
}

const john6 = new Person6('John', 1990, 'teacher');


//// 7.116 Classes and Subclasses ////////

// ES5

var Person5 = function(name, yearOfBirth, job){
    this.firstName = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function(){
    
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    
    // We have to use .call() and pass it  this   as the first keyword so that the name, yearOfBirth, and job are set as properties of the new athlete we are creating.  

    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}



// this is setting the prototype property of Athlete5 object with the same contents as the .prototype object of Person5.  AFAICT, .prototype of an object is just another object containing all properties that have specifically been made available.  So what we're saying here is that anything we've made available to objects created by Person5 will also be made available to objects created by Athlete5.


Athlete5.prototype = Object.create(Person5.prototype)

// Originally I defined the wonMedal before creating the .prototype object in the line above.  Got an error saying .wonMedal() is not a function, which makes sense.  The old version of the Athlete5 prototype object was overwritten by the copy of the Person5 prototype object, so wonMedal was eliminated.

Athlete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();




// ES6

class Person6 {

    // looks like we have to define the constructor
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}


// Name of the subclass     extends    name of the superclass

class Athlete6 extends Person6 {

    constructor(name, yearOfBirth, job, olympicGames, medals){
        //this calls the superclass, and we're passing it the name, yearOfBirth, and job arguments we get when we create a new Athlete6()
        super(name, yearOfBirth, job);
        
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
*/







//// 7.117 - Coding Challenge 8 //////////////////////////////

// * A map containing all Parks.  Map because we will want to iterate through these.

const allParks = new Map();
const allStreets = new Map();

// Any function that calclulates from multiple entries defined here.

// 1. Get tree density for each park

const getParkTreeDensities = function(){
    allParks.forEach(function(value, key){

        // round the tree density so output isn't messy.
        let roundTD = Math.round(allParks.get(key).treeDensity());

        console.log(`${allParks.get(key).name} has ${roundTD} trees per square kilometer.`);
    })
}

// 2. Get average park age.

const getParkAvgAge = function(){
    let totalAge = 0;
    let avgAge = 0
    allParks.forEach(function(value, key){
        
        totalAge +=(allParks.get(key).age);
    });
    avgAge =  Math.round(totalAge/allParks.size);
    console.log(`The town's parks have an average age of ${avgAge} years.`);
};

// 3.  Find which parks have more than 1k trees

const getParkTreeMinimum = function(min){
    let WoodedParkString = "";
    console.log(`The following parks have more than ${min} trees:`)
    allParks.forEach(function(value, key){
        if ((allParks.get(key).numberTrees)  > min){
            console.log(key);
        };
    });
    
}

// 4.  calculate total street length
const getStreetTotalLength = function(){
    var sumStreetLength = 0;
    // Deleting the value parameter blows the whole thing up.  Why?
    allStreets.forEach(function(value, key){
        sumStreetLength += allStreets.get(key).streetLength;
    })
    return sumStreetLength;
    
}

// 4.  calculate average street length
const getStreetAvgLength = function(){
    let StreetAvgLength = Math.round(getStreetTotalLength() / allStreets.size);
    
    console.log(`The city's streets are an average of ${StreetAvgLength} km long.`)
}


// 5. Prints out all the street classifications

const getStreetTypes  = function(){
    allStreets.forEach(function(value, key){
        console.log(`${key}, built in ${allStreets.get(key).yearBuilt}, is a ${allStreets.get(key).sizeClass} street`);
    });
};

///// Function Constructors ////////////////////


// A CityObject class - Parent class to Street and Park
class CityObject{
    constructor(name, yearBuilt){
        this.name = name;
        this.yearBuilt = yearBuilt;
        // automatically calculate how old it is.
        this.age = (new Date().getFullYear()) - yearBuilt;
    };
};


// A Parks class, extending CityObjects
class Park extends CityObject{
    constructor(name, yearBuilt, numberTrees, area){
        
        super(name, yearBuilt);
        
        this.numberTrees = numberTrees;
        this.area = area;

        // Adds this to the allParks map
        allParks.set((this.name), this)
    }

    treeDensity(){

        var d = -1;
        // making sure that both park area and number of trees are positive before computing.  Otherwise, return -1.
        if(this.numberTrees > 0 && this.area > 0){
            d = (this.numberTrees/this.area); 
        }

        return d;
    }
}




// A Street subclass, also extending CityObjects

class Street extends CityObject{
    
    constructor(name, yearBuilt, streetLength, sizeClass = 'normal'){
        
        const streetTypes = ["tiny", 'small', 'normal', 'big', 'huge'];
        
        super(name, yearBuilt);
        this.streetLength = streetLength;

        // We only want to set the sizeClass if it is one of the five options in streetTypes.  Othewise, the default 'normal' will be used.
        if(streetTypes.includes(sizeClass)){
            this.sizeClass = sizeClass;
        } else {
            this.sizeClass = "normal";
        };

        

        // Adds this to the allStreets map 
        allStreets.set((this.name), this);
    }
};


// creating the streets
new Park('Wicker Park', 1899, 44, 2);
new Park('Bhinna Park', 1983, 777, 3);
new Park('Piedmont Park', 1985, 2111, 4);
new Park('Yellowstone National Park', 1882, 55000, 4400);

//creating the parks
new Street('Englewood', 1967, 22, "fart");
new Street('Halsted', 1900, 44, "big");
new Street("Wolcott", 1902, 14, "huge");

console.log(allParks);
console.log(allStreets);

// Printout of the actual report.
const lineDivider = " --------------------------------------------------"

// Question 1:
console.log(`1.${lineDivider}`);
getParkTreeDensities();

// Question 2:
console.log(`2.${lineDivider}`);
getParkAvgAge();

// Question 3:
console.log(`3.${lineDivider}`);
getParkTreeMinimum(1001);

// Question 4:
console.log(`4.${lineDivider}`);
console.log(`The town's streets are a total of ${getStreetTotalLength()} km long`);

getStreetAvgLength();

// Question 5:
console.log(`5.${lineDivider}`);
getStreetTypes();

