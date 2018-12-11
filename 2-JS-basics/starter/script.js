

/*



//// 2.14 Instructor's version  /////

  var markMass = 95
var markHeight = 2.01

var johnMass = 50
var johnHeight = 1.4

var markBMI = markMass / (markHeight * markHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);

var fatness = markBMI > johnBMI

console.log("Is Mark fatter than John? " + fatness);
 
//// 2.14 version with objects and functions ///

 var john = {name:"John", height:2.1, weight: 95,};
 var mark = {name:"Mark", height:1.4, weight:50,}

 var bmi = function(name){
     var result = name.weight / (name.height * name.height);
     return result;
 }

 var fattestFuck = function(a,b){
     console.log(`is ${a.name} fatter than ${b.name}? It's ${bmi(a) > bmi(b)}!`);
 }

 fattestFuck(john, mark);



//// 2.15 If and Else conditionals /////////

var firstName = 'John';
var age = 16;

if(age < 13) {
    console.log(`${firstName} is a boy`);
} else if(age >= 13 && age < 20){
    console.log(`${firstName} is a teenager`);
} else if(age >=20 && age <30){
    console.log(`${firstName} is a young man`);
} else {
    console.log(`${firstName} is a man`);
}

age >=18 ? console.log(`${firstName} drinks beer.`)
: console.log(`${firstName} drinks juice.`);


//// 2.16 //////////

// ternary statement
var firstName = 'John';
var age = 16;

age >=18 ? console.log(firstName + " drinks beer")
: console.log(firstName + " drinks juice");

var drink = age >= 18 ? console.log('beer') : console.log('juice');

// Switch statement

const first = 'Tom';

var job = 'designer';
switch (job) {
    case "teacher" :
    case "instructor" :  // this gives the same response to both
        console.log(first + ' teaches kids to code');
        break;
    case "driver" :
        console.log(first + ' drives the bus');
        break;
    case "designer" :
        console.log(first + ' is a poorly-paid genius');
        break;
    default: console.log(first + " does something else!");

    }


var firstName = 'John';
var age = 16;    

switch(true){  // note that we have the contitional set to true, not the variable.
    case(age < 13) :
        console.log(`${firstName} is a boy`);
        break;
    case(age >= 13 && age < 20):
        console.log(`${firstName} is a teenager`);
        break;
    case(age >=20 && age <30):
        console.log(`${firstName} is a young man`);
        break;
    default:
    console.log(`${firstName} is a man`);
}

  //// 2.17 ////////

// falsy values: undefines, null, 0, "", NaN - these values are treated as FALSE
// truthy values: all NOT falsy values. - Treated as true.

var height = "23";

if(height || height === 0){console.log("success!");
}
else {console.log("variable not defined.");
}

// Equal vs. strict equal
// == does type coercion.  It will try to turn things into the value
// type of the thing is being compared to.  === DOES NOT do type coercion.

if(height === 23){console.log("almost 23");
}


//// 2.18 ////////
// CODING CHALLENGE //

var johnScore = (89 + 120 + 103);
var mikeScore = (116 + 94 + 105);
var maryScore = (97 + 102 + 105);

var johnAvg = johnScore / 3;
var mikeAvg = mikeScore / 3;
var maryAvg = maryScore / 3;

switch(true){
    case(johnAvg > mikeAvg && johnAvg > maryAvg):
        console.log("John wins with a score of " + johnAvg);
    break;

    case(mikeAvg > johnAvg && mikeAvg > maryAvg):
        console.log("Mike wins with a score of " + mikeAvg);
    break;

    case(maryAvg > mikeAvg && maryAvg > johnAvg):
        console.log("Mary wins with a score of " + johnAvg);
    break;
    
    default: 
        console.log("There was a tie!  Everyone loses!");
    
}

*/
