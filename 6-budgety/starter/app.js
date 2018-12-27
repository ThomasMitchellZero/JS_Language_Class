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

//////// MODULE DEFINITIONS ///////////////////////////

// BUDGET CONTROLLER ////
var budgetController = (function(){
    
})();

// UI CONTROLLER ////


var UIController = (function(){

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
    }

    return {
        // this will be used by other modules so it has to be a public function.  But why is it a function that returns an object and not just the object?  Maybe so the methods don't get overwritten?
        getInput: function(){
            return {
                // will return either 'inc' or 'exp'
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        getDOMstrings: function(){
            return DOMstrings;
        },
    }


})();




// GLOBAL APP CONTROLLER ////
var controller = (function(budgetCtrl, UIctrl){

    // we import the DOMstrings object from UIcontrol moduel that we made available via 
    var DOM = UIctrl.getDOMstrings();
    // Does all necessary operations for when the user hits Enter.
    var ctrlAddItem = function(){

    // get the field input data
        
        // UIctrl points to UIcontroller because we pass it as a variable to the controller function, and getInput is a method of UIController.
        var input = UIctrl.getInput();
        console.log(input);



        // add the item to the budget controller

        // add the new item to the user interface

        // Calculate the budget

        // Display the budget in the UI
    }

    // listens for a click on .add__btn and runs the ctrlAddItem function.
    document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

    // this is how we listen for a key being pressed - in this case, Enter
    document.addEventListener("keypress", function(event){
        if (event.keyCode === 13){
            ctrlAddItem();
        }
    })

})(budgetController, UIController)