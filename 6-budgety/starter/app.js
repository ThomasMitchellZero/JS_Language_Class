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

    return {
        publicTest: function(b){
            return(add(b));
        }
    }

})();


var UIController = (function(){
    // some code later
})();


// the reason we are accepting the other controllers as parameters and not just calling them inside is because if we changed the name of the controllers, we would have to change them EVERYWHERE they are invoked inside the controller module.

var controller = (function(budgetCtrl, UIctrl){
    // more code

    var z = budgetCtrl.publicTest(5);

    return {
        controllerTest: function(){
            console.log(z);
        }
    }
})(budgetController, UIController)

controller.controllerTest()