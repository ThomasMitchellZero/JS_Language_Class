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



//// Section 5.65 First Clas Functions ////////

var years = [1903, 1986, 1990, 1998, 2002, 2007];

// this is just a generic function that loops through an array and performs 
// a function
function arrayCalc(arr, fn) {
    var arrResult = [];
    for(var i = 0; i < arr.length; i++){
        arrResult.push(fn(arr[i]));
    }
    return arrResult;
}

function calculateAge(el){
    return 2018 - el;
};

function fullAge(age){
    return age >= 21
}

function maxHeartRate(el){
    if(el >= 18 && el <= 81){
        return Math.round(206.9 - (0.67 * el));
    } else {
        return "Pick a better age!"
    };
};

var ages = arrayCalc(years, calculateAge);

var fullAges = arrayCalc(ages, fullAge);

var heartRates = arrayCalc(ages, maxHeartRate);

console.log(ages, fullAges, heartRates);



//// 5.66 Functions Returning Functions ////////

// this main function gets an input(job) and it returns a function, which
// is allowed because functions are objects.
function interviewQuestion(job){
    switch(true){
        case job === 'designer':
            return function(name){
                console.log(name +", does it suck to be poor?")
            }
        case job === 'teacher':
            return function(name){
                console.log(name + ", do you hit your students?")
            }
        default:
            return function(name){
                console.log(name + ", get a better job!")
            }
    }
}

// this just produces the appropriate function.  We have to store it 
// in a variable because we have yet to call the function.

var teacherQuestion = interviewQuestion('designer');
teacherQuestion("Tom");

// Looks strange, but this also works.  This returns the interview question
// for 'teacher' and then immediately passes that function the argument of
// ('Mark')
interviewQuestion('teacher')('Mark');


//// 5.67 Instantly Invoked Function Expressions ////////


var sillyGame = function(){
    var number = Math.floor(Math.random * 10) + 1
    if (number <= 5){
        console.log("You Lose!")
    } else {
        console.log('You Win!')
    }

}

// the anonymous function needs to be in parentheses or else JS sees it
// as a function declaration without a name (i.e. a syntax error).  Then
// it's just a normal anonymous function.  The two parentheses outside the
// function are what actually tell it to run.  

const luck = 2;

(function(luck){
    var number = Math.random() * 10;
    console.log(number);
    console.log(number >= 5 - luck);

// this is where we pass in the argument to this anonymous function.
})(luck);

//// 5.68 Closures ////////

function retirement(retirementAge){
    var a = ' years left until retirement';
    return function (yearOfBirth){
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}


var retirementUS = retirement(67);
var retirementGermany = retirement(65);
var retirementIndia = retirement(80);

retirementUS(1990);
retirementGermany(1990);
retirementIndia(1990);


function interviewQuestion(job){
    
    return function(name){

        var a = ", can you tell me about UX design?";
        var b = ", what are your thoughts on corporal punishment?";
        var c = ", what would you say...ya do here?";
        
        var IQfunc = function(respVar){console.log(name + respVar)}
        
        if(job === 'designer'){
            IQfunc(a);
        }else if(job === 'teacher'){
            IQfunc(b);
        } else {
            IQfunc(c);
        }
    }
}

interviewQuestion('teacher')('Tom');



//// 5. 69 Bind, Call, and Apply ////////

var john = {
    name: "John",
    age: 35,
    job: 'designer',
    presentation: function(style, timeOfDay){

        if(style === 'formal'){
            console.log("Good " + timeOfDay + ", ladies and gentlemen! I'm "
            + this.name + ", I'm a " + this.job + ", and I'm " + this.age);
        } else {
            console.log(timeOfDay + ", bitches!  I'm "
            + this.name + ", I'm a " + this.job + ", and I'm " + this.age);
        }
    }
}

var emily = {
    name: "Emily",
    age: 32,
    job: 'teacher',
}

john.presentation('', 'morning');

// the first parameter of .call() lets you point the .this object at something
// a different object.
john.presentation.call(emily, 'friendly', 'afternoon');


// like call, the first argument sets which object .this   applies to.
// Subesquent arguments will be passed into the function IN ORDER as though
// they were passed as arguments.  AFAICT any arguments that are passed
// in the call will just be added to the end of the queue.

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');

*/

//// 5.70 Coding Challenge ////////

// by wrapping the whole thing in an IIFE, it will now run in its own
// execution context so anyone who runs this code doesn't have to worry
// about it interfering with their variables.

(function(){



var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

//////// .prototype methods    /////////////////////////


Question.prototype.pushIt = function(){
    questionList.push(this);
}

Question.prototype.showAnswerList = function(){

    // Print the question
    console.log(this.question);

    // Print every possible answer option
    for(i=0; i < this.answers.length; i++){
        console.log(i + ": "+ this.answers[i]);
    }
}

Question.prototype.checkResponse = function(ans){
    if(this.correctAnswer == ans){
        console.log("Correct!")
    } else {
        console.log("You chose...poorly.");
    }
}

//// Questions for the list //////////////////////////////////////////////

var sky = new Question('Is the sky blue?', ['Aye', 'Nay','maybe'], 0)


var water = new Question('Is water wet?', ['Yes', 'No', 
    "Your mom's wet"], 0)


var bear = new Question('Does a bear shit in the woods?', ["Ja", "Nein", 
    "Only until house-trained"], 2)


var pope = new Question('The pope is...', ['Benedictine', 'Pauline', 
    "Palpatine"], 2)


/////  Actual program running  //////// 

var questionList = [sky, water, bear, pope];

function nextQuestion(){

    // this function chooses a question at random and displays it.
    var questionSelector = (Math.floor(Math.random() * questionList.length));
        
    // uses the random number in questionSelector to pick a question.
    questionList[questionSelector].showAnswerList();
    
    //ask what their guess is.
    var input = prompt("Please enter the number of your guess","0");
    
    questionList[questionSelector].checkResponse(input);

    nextQuestion()
}

nextQuestion();

// end of the IIFE
})()
