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

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // not sure why this is the best data structure.  Hoping for clarification later today.
    var data = {
        allItems: {
            exp:[],
            inc:[],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    };

    return {

        // This function adds the user's inputs to the database.
        addItem: function(type, des, val){
            
            var newItem, ID;
                // type will be either inc or exp, so this picks the appropriate array to check. This gets the lenght of the chosen array and then this just gets the id property(the number) of the last item in the array, then adds 1 to that.  This generates a new ID 1 bigger than the previous largest.

            if(data.allItems[type].length > 0){
                ID = (data.allItems[type][data.allItems[type].length -1].id +1);
            } else {
                ID = 0;
            };
            
            
            
            // Makes a new Income or Expense object based on the type the user inputs.
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);

            } else {
                newItem = new Income(ID, des, val);

            };
            // I don't remember seeing this pattern before.  Looks like the brackets allow you to specify the property you want to access by passing a string to the brackets?
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function(){console.log(data)},
    };
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

    var setupEventListeners = function(){
        // DOM elements are only needed for event listeners, so they can go in here.  We're importing the contents of the DOMstring object from the UIcontrol module.

        var DOM = UIctrl.getDOMstrings();

        // listens for a click on .add__btn and runs the ctrlAddItem function.
        document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

        // this is how we listen for a key being pressed - in this case, Enter
        document.addEventListener("keypress", function(event){
            if (event.keyCode === 13){
                ctrlAddItem();
            }
        });

    };
    setupEventListeners();


    // Does all necessary operations for when the user hits Enter.
    var ctrlAddItem = function(){

        var input, newItem;
        
        // This stores the values that the user enters as an object.
        var input = UIctrl.getInput();

        // takes the object in  input  and passes its properties as arguments to the addItem method from budgetController.  Then it stores the entry as an object in the database.
        newItem = budgetCtrl.addItem (input.type, input.description, input.value);



        // add the item to the budget controller

        // add the new item to the user interface

        // Calculate the budget

        // Display the budget in the UI
    };

    // ONLY returned objects will EVER be accessible outside the scope of an IIFE.
    return {
        // again, not sure why we have the anonymous function insteaod of just calling setupEventListeners();
        init: function(){
            console.log('app has started');
            setupEventListeners();

        },
    }

})(budgetController, UIController)

controller.init();