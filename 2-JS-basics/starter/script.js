

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


//// 2.25 Arrays coding challenge ////////
var billList = [124, 48, 268];

var justTheTip = [];
var totalCosts = [];

var tipCalculator = function(bills){
    

    // function to calculate the tip
    var tipify = function(cost){
        switch(true){
            case cost < 50:
                return cost * 0.2;
            case cost >= 50 && cost < 200:
                return cost * 0.15;
            default:
                return cost * 0.1;
        }
    }

    justTheTip.push(tipify(bills))
    totalCosts.push(bills + tipify(bills))
}

tipCalculator(124);
tipCalculator(48);
tipCalculator(268);

console.log(justTheTip, totalCosts);

//// 2.25 Objects ////////

var john = {
    firstName:'John',
    lastName:'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false,
};

console.log(john);
console.log(john.firstName);
var x = 'birthYear';
console.log(john[x]);

john.job = 'designer';
console.log(john.job);


//// 2.26 Methods ////////

var john = {
    firstName:'John',
    lastName:'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function(){
        this.age = 2018 - this.birthYear;
    }

};

john.calcAge()
console.log(john.calcAge());


//// 2.27 Coding Challenge - Objects and Methods ////////

var mark = {name: "Mark", height: 2.1, weight: 95,}
var john = {name: "John", height: 2.1, weight: 95,}

var bmi = function(person){
    return person.weight / (person.height * person.height)
}

var fattestPerson =function(persA, persB){
    switch(true){
        case bmi(persA) > bmi(persB):
            return(`${persA.name} is fatter!`);

        case bmi(persA) < bmi(persB):
            return(`${persB.name} is fatter!`);
            
        default:
            return("They're both fat.");
    }
};

console.log(fattestPerson(mark,john));




//// 2.29 For and While loops /////////

for (var i = 1; i <= 20; i++){
    console.log(i);
}

var john = ['John', 'Smith', 1990, 'teacher', false];
// For Loop
for (var i = 0; i < john.length; i ++){
    console.log(john[i]);
}

//While Loop
var i = 0
while (i < john.length){
    console.log(john[i]);
    i++;
}


// Continue quits the current iteration of the loop but lets the loop continue

var john = ['John', 'Smith', 1990, 'teacher', false];


for (var i = (john.length - 1); i >=0; i--){
    if(typeof john[i] !== 'string'){continue;}
    console.log(john[i]);
}

// Break stops the loop entirely

for (var i = 0; i < john.length; i ++){
    if(typeof john[i] !== 'string'){break;}
    console.log(john[i]);
}

*/



var bills = { 
    billVals: [124,48,268, 280, 42],
    allTips: [],
    totalCosts: [],
    tipCalc: function(cost){
        switch(true){
            case cost < 50:
                return cost * 0.2;
            case cost >= 50 && cost < 200:
                return cost * 0.15;
            default:
                return cost * 0.1;

        }
    },


    billCalc: function(){
        for(i = 0; i < this.billVals.length; i++){
            
            unitCost = this.billVals[i]


            this.allTips.push(this.tipCalc(unitCost));
            this.totalCosts.push(unitCost + this.tipCalc(unitCost));
            
        }
    }
  }

bills.billCalc();
console.log(bills.allTips, bills.totalCosts);

var tipAvg = function(tipList){
    var result = 0;
    for(i = 0; i < tipList.length; i++ ){
        result += tipList[i];
    }
    return result/tipList.length;
}

console.log(tipAvg(bills.billVals));

