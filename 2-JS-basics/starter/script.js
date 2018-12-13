

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

//// 2.20 Functions ////////

function calculateAge(birthyear){
    return 2018 - birthyear;
}

var ageJohn = calculateAge(1983);
console.log(ageJohn);

function yearsUntilRetirement(year, firstName){
    var age = calculateAge(year);
    var timer = 65 - age;
    if(timer > 0){
        console.log(`${firstName} has ${timer} years left until retirement`);
    } else {
        console.log(`${firstName} is already retired!`);
    }
    
}

yearsUntilRetirement(1903, "Tom");

//// 2.21 Function Expressions and Function Declarations ////////

//Function Declaration
//function whatYouDo(job, name){};

// Function Expression
var whatYouDo = function(job, name){
    switch(job){
        case "teacher":
            
        // No break statement is necessary.  The return keyword 
        //returns the value and also immediately ends the function.
            return name + " teaches kids";
        
        case "driver":
            return name + " drives the kids";
        
        case "designer":
            return name + " is a poorly-paid genius";

        default :
            return "How should I know?";

    }

};

console.log(whatYouDo('designer', 'Mike'));

// Function xpressions return a value as their result. They do not
// have to have the function(x){} format.  a > b is an expression,
// because it returns a boolean


// Statements may do something, like console.log or setting a 
// variable, but they do not return a result.

//// 2.22 Arrays /////////

var names = ['john','mark', 'jane'];
var years = [1990, 1969, 1948];


// mutate array data
// Arrays do not work with curly braces.

names[1] = 'ben';


console.log(names.length);

names[5] = "mary";

console.log(names[5]);
console.log(names[4]);
console.log(names.length);

******

var john = ['John', 'Smith', 1990, 'teacher', false];

john.push('blue');  // push adds to the end

john.unshift('Mr.');  // unshift adds to beginning

console.log(john);  

john.pop();  // removes the last element
john.shift();   // removes the first element

console.log(john.indexOf("23"));  // gets the position of the parameter
console.log(john);

var isDesigner = john.indexOf('teacher') === -1 ? 
'John is not a desiger' : 'John is a designer';

console.log(isDesigner);

*/

var billList = [124, 48, 268];



var tipCalculator = function(bills){
    var justTheTip = [];
    var totalCosts = [];
    
    if (bills.length === -1){
        return justTheTip, totalCosts;
    } else {
        var tip = bills[0] * 0.2;
        justTheTip.push(tip);
        totalCosts.push(bills[0] + tip);
        bills.pop(bills[0]);
    }
    return justTheTip, totalCosts;
};

console.log(tipCalculator(billList));

