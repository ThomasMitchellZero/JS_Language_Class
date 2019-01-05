/*

*/

//////// MODULE DEFINITIONS ///////////////////////////

// BUDGET CONTROLLER ////
var budgetController = (function(){

    // function contstructor for new expenses
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // function contstructor for new Income
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type){
        var sum = 0
        data.allItems[type].forEach(function(cur){
            
            // Note that .value isn't a method.  Every item in the  exp  and  inc  arrays  is an object.  .value is the property those objects that actually contains the number.
            sum += cur.value;
        });
        data.totals[type] = sum;
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
        budget: 0,
        percentage: -1,
    };

    return {

        // Adds the arguments it is given to the database.
        addItem: function(type, des, val){
            
            var newItem, ID;

            //// This section generates a unique ID number for each entry being added to the DB.  Each new object created is pushed to the end of the array, and the next ID will be ++ the last ID, so the IDs will always be in ascending numerical order.

            if(data.allItems[type].length > 0){

                // allItems object, then picks the array that matches the type ('inc' or 'expense') since we are storing them in two arrays
                ID = (data.allItems[type]

                    // This gets the last element in that array.  Because arrays are zero-based, (.length - 1) always gets you the index of the last element in an array.
                    [data.allItems[type].length -1]

                    // gets the value of the ID property of that last element and adds 1 to it.  
                    .id +1);
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

        calculateBudget: function(){

            // sums all array entries of the Expense and Income arrays
            calculateTotal('exp');
            calculateTotal('inc');
            
            data.budget = data.totals.inc; - data.totals.exp;

            // Divides expenses by income, * 100 for an even number, and then Math.rounds it off.
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) *100);
            } else {
                data.percentage = -1;
            }
            

        },

        // we could return these values as part of calculateBudget, but the instructor says it's better to have separate functions for separate oeprations.
        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
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
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        percentageLabel: ".budget__expenses--percentage",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
    };

    return {

        // this will be used by other modules so it has to be a public function.  But why is it a function that returns an object and not just the object?  Maybe so the methods don't get overwritten?
        getInput: function(){
            return {
                // will return either 'inc' or 'exp'
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                // parseFloat turns a string into a decimal number
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },

        addListItem: function(obj, type){
        
        var newHtml, id, description, value, percentage, element;
        
        id = obj.id;
        value = obj.value;
        description = obj.description;
        percentage = 0


        // create HTML string with placeholder text
        if(type === 'inc'){

            // Points to the Incomes container
            element = DOMstrings.incomeContainer

            // this is just a string of HTML, but the  obj  argument will be an object containing the properties that will be used to fill in the placeholders.
            newHtml = `<div class="item clearfix" id="income-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">+ ${value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`

        } else if(type === 'exp'){
            // Points it to Expenses instead of Incomes
            element = DOMstrings.expenseContainer
            // same as above
            newHtml =`<div class="item clearfix" id="expense-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">- ${value}</div><div class="item__percentage">$${percentage}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
        }
        
        // element  was set to either the Expenses container or the Income container by the previous If/Else statement.  This inserts the newHtml string we created with the correct values into the DOM.  The "beforeend" property just means it will be the last item.
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

            // replace placeholder text with actual data

            // insert the HTML into the DOM
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            
            // Holy method chain, Batman!  OK.  We want to slice this string, but slice is not a method of the string object.  It is a method of the array object. So.  From the Array object, we get its Prototype object, from which we get its slice method.  All functions have a property called .call, which will call the method on the object passed to it as an argument - in this case, the  fields  object.
            fieldsArr = Array.prototype.slice.call(fields);

            // forEach loops over all the elements.  It has access to the current element, the index of that element, and the array as a whole.
            fieldsArr.forEach(function(current, index, array){
                // goes through each element in the array and sets it to an empty string.
                current.value = "";
            });

            // sets the cursor location back to Description. 
            
            //AFAICT here's how this works.  fieldsARR is an array with two elements.  We got those elements from slicing the string we got from  fields,  which we got from querySelectorAll of a concatentation of DOMstrings.inputDescription and DOMstrings.inputValue, which are properties in the DOMstring object that contain ".add__description" and ".add__value".  Yikes.

            fieldsArr[0].focus();
        },

        displayBudget: function(obj){

            // querySelector points to the variable we set equal to each item's respective class string.  Obj will be the object that will be returned by the getBudget method in the BUDGET CONTROLLER section, and its properties contain the info we need from the database.


            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            
            // this is to show --- if there the percentage is zero or negative, and to show the % sign after anything that is positive.
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + " %";
            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }

            console.log(obj);
        },

        getDOMstrings: function(){
            return DOMstrings;
        },
    }


})();




// GLOBAL APP CONTROLLER ////
var controller = (function(budgetCtrl, UIctrl){

    // tells the program how to respond to user clicking OK or hitting Enter.
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

    // Does everything needed to add a new entry to the database, return those values, and put them in the DOM.
    var updateBudget = function(){
        
        // Running this creates the values for total expenses, total income, budget, and percentage in the database.
        budgetCtrl.calculateBudget();
        
        // running this gets those values generated by calculateBudget() from the database and returns them as an object.
        var budget = budgetCtrl.getBudget();
        
        UIctrl.displayBudget(budget);
    }

    // When user hits enter, everything in here will be executed..
    var ctrlAddItem = function(){

        var input, newItem;
        
        // This stores the values that the user enters as an object.
        input = UIctrl.getInput();


        // prevents the app from taking empty entries
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            
            // takes the object in  input  and passes its properties as arguments to the addItem method from budgetController.  Then it stores the entry as an object in the database.
            newItem = budgetCtrl.addItem (input.type, input.description, input.value);

            // calls the addListItem method to add the newItem to the HTML.  Of note, we are passing it  newItem  as the first argument not  input.  This is for two reasons.  First, the unique ID number is generated as part of the addItem method.  input doesn't have a unique ID.  Second, addItem doesn't JUST push the object to the database.  It also returns the object it just pushed, which is what the addListItem method is able to pull properties from.
            UIctrl.addListItem(newItem, input.type)

            // this method clears the input fields whenever the user enters a value
            UIctrl.clearFields();

            updateBudget();

        

        };

    };

    // ONLY returned objects will EVER be accessible outside the scope of an IIFE.
    return {
        // again, not sure why we have the anonymous function insteaod of just calling setupEventListeners();
        init: function(){
            console.log('app has started');
            setupEventListeners();
            
            //displayBudget is already what we use to change the UI when the user enters data. Here we are just passing it an anonymous object where all values are set to zero so that on startup, everything is zeroed out.

            UIctrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });

        },
    }

})(budgetController, UIController)

controller.init();