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

*/



