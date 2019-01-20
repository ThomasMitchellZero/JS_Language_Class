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


*/



