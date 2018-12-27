/*
CONTROLLER MODULE:
-------------
ADD EVENT HANDLER


DATA MODULE:
---------------------
ADD NEW ITEM TO DATA STRUCTURE


-Add an event/listenter to the OK button
-Need to create a Function Constructor to make a new object of every entry.
-Collect the user's input (+/-, description, value) from the input fields

-Add credits to the Income side and add debits to the Expenses side


UI MODULE:
----------------
GET INPUT VALUES
ADD NEW ITEM TO THE UI
UPDATE THE UI


-Function Constructor needs a .prototype method that deletes the entry.

-Also needs a .prototype method to calculate each expense's percentage of the total.

*/



// making an IIFE for data privacy
var budgetController = (function(){
    
    // when budget controller is invoked, a var x is created and set to 23 in the new execution context.  
    var x = 23
    // same thing here.  A named function is created.
    var add = function(a){
        return x + a;
    }
    // the actual return of this function is an object.  It has one property: publicText, and its value is this function.  The result is basically - - - var budgetController = {publicTest: function(b){...} };
    return {
        publicTest: function(b){
            console.log(add(b));
        }
    }
    // Once the function runs,  x  and  add  are generated and stored within the function, but not accessible from anywhere outside.  However, because of lexical scope, inner functions have access to the contents of outer functions, EVEN AFTER the outer function completes.
})();

// budgetController.add(5); will fail because add is a variable, not a property.  The error we get is  - TypeError: budgetController is not a function - which is true!  There is an anonymous function, but because parentheses (grouping) happens before assignment, the function is resolved and gone before anything gets assigned to the variable.  Instead, the function produces an object, and that object gets assigned to budgetController.  If we got rid of the first parenthesis in front of  (function(){} this would be a function, but it's not.  

budgetController.publicTest = 111;
console.log(budgetController.publicTest)


budgetController.publicTest(5);