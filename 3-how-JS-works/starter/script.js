///////////////////////////////////////
// Lecture: Hoisting

/**
 *  
 * 
 
 
 
 calculateAge(1999);

function calculateAge(year){
    console.log(2018 - year);

}

//retirement(1990);

var retirement = function(year){
    console.log(65 - (2018 - year));
}


// variables

console.log(age);   // this shows up as undefined because all variables are
                    // hoisted but their values are set to undefined until
                    // they are set in the code.
var age =23;
console.log(age);


function foo(){         // when execution reaches here, foo goes to the top of the stack.
                        // JS looks for variables and finds one, age.  Its value is set to undefined during hoisting.
    console.log(age);   // Age isn't defined yet, so it prints undefined.
    var age = 65;       // Now age is defined.  Note that if this line were
                        // removed, both console.logs would print 23 because
                        // age isn't defined in this scope and so its value
                        // isn't re-set.
    console.log(age);   // now it prints 65;
}

foo();
console.log(age);



 * 
 */













///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

/*

console.log(this)

function calculateAge(year){
    console.log(2018 - year);
    console.log(this);
}

calculateAge(1983);

*/


var  john = {
    name: "John",
    yearOfBirth: 1990,
    calculateAge: function(){
        console.log(this);
        console.log(2018 - this.yearOfBirth);

        /*
        function innerFunction(){   // the this keyword always refers to the
                                    // parent object of a function.  Even thoguh
                                    //this function is inside of an object,
                                    // it is not a method of that object, so its
                                    //parent is still the window object.
            console.log(this);
        }
        innerFunction();        
        
        
        */

    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1977,
     
}
mike.calculateAge = john.calculateAge;  //the value of this is only assigned 
                                        //when the object calls the method.
mike.calculateAge();