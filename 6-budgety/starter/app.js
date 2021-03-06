/*

*/

//////// MODULE DEFINITIONS ///////////////////////////

// BUDGET CONTROLLER ////

// So I think the way this works (i.e. the reason the values in the DB don't keep getting reset) is that this function and the UI controller are actually only invoked once.  They are passed as arguments to   controller   AKA the GLOBAL APP CONTROLLER, which AFAICT means they are invoked immediately.   Remember, these functions return objects.  So every time I see something like newItem = budgetCtrl.addItem    that doesn't mean that budgetCtrl is being called again.  It means that the addItem method of budgetCtrl is being called, and that method is only available to me because it was returned as one member of the object the one time BudgetCtrl was called.





var budgetController = (function(){

    // function contstructor for new expenses
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        // setting percentage to -1 because it's going to be defined by our calcPercentage method.  
        this.percentage = -1;
    };
    // each item in Expense will also have a method to calculate its percentage of the total.  This calculates the percentage and then assigns that value to the   .percentage   property of each object in the exp array.
    Expense.prototype.calcPercentage = function(totalIncome){
        // we only want to do this if there is an income so it doesn't look weird.
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome)*100);
        } else {
            this.percentage = -1;
        };
    };
    // This returns just returns the value of the percentage.
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    // function contstructor for new Income
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0
        data.allItems[type].forEach(function(cur){
            
            // Note that .value isn't a method.  Every item in the  exp  and  inc  arrays  is an object.  .value is the property those objects that actually contains the number.
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

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

        deleteItem: function(type, id){

            var ids, index
            
            // The IDs are stored as values of objects in the exp and inc arrays, and the IDs are not related to array position.  We're going to create a new array containing the ID values of each element.  This seems to have more steps than it ought to, and I don't like this data model.  

            // .map creates a new array containing the results of calling a function on each element in an array.
            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            // now we have a second array, and the position of each array element corresponds to the position of the object it was created from.  That means that the index of an element that matches   id   will be the index of the element we want to delete from the database.

            index = ids.indexOf(id)

            // if a match is found, delete the one item found at that index from data.allitems

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function(){

            // sums all array entries of the Expense and Income arrays
            calculateTotal('exp');
            calculateTotal('inc');
            
            data.budget = data.totals.inc - data.totals.exp;

            // Divides expenses by income, * 100 for an even number, and then Math.rounds it off.
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) *100);
            } else {
                data.percentage = -1;
            }
            

        },

        calculatePercentages: function(){
            
            data.allItems.exp.forEach(function(cur){

                //We are passing in the total income from the database as the parameter for calcPercentage because it needs to know the total.
                cur.calcPercentage(data.totals.inc);
            })
            
        },

        // I almost got tripped up here.  getPercentage is an internal function, while getPercentages is exposed to the outside.

        getPercentages: function(){
            // this goes through the array of expenses, and for each item, it gets the percentange and then puts that percentage in to a new array, allPerc, where the percentage has the same index as the expense it came from. 
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            })
            return allPerc;
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
        container: ".container",
        expensesPercLabel: ".item__percentage",
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
            newHtml = `<div class="item clearfix" id="inc-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">+ ${value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`

        } else if(type === 'exp'){
            // Points it to Expenses instead of Incomes
            element = DOMstrings.expenseContainer
            // same as above
            newHtml =`<div class="item clearfix" id="exp-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">- ${value}</div><div class="item__percentage">$${percentage}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
        }
        
        // element  was set to either the Expenses container or the Income container by the previous If/Else statement.  This inserts the newHtml string we created with the correct values into the DOM.  The "beforeend" property just means it will be the last item.
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

            // replace placeholder text with actual data

            // insert the HTML into the DOM
        },


        // We're going to invoke this in the   ctrlDeleteItem   method in the Global App Controller, which is where we'll get the argument for selectorID.  

        deleteListItem: function(selectorID){

            var el = document.getElementById(selectorID);
            
            // selectorID is the element we want to delete.  However, we have to go to its parent node and then delete this child because JS won't let you delete an element directly.
            el.parentNode.removeChild(el);
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

        displayPercentages: function(percentages){

            // this selects every HTML node with the class of .item__percentage which is what we stored in the expensesPercLabel variable.   The results of this selection are stored in  fields,  although I don't know what exactly is stored there.  
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            var nodeListForEach = function(list, callBack){
                // we can do this because while the node list does not have most array properties, it DOES have a length property.
                for(var i = 0; i < list.length; i++){
                    // the function we are going to call will need the contents of the current node and its index.  Hence the two parameters we are passing the callback.  I assume this is to make the function more generalizable, because otherwhise I don't see why we should pass it as an argument instead of defining it here. 
                    
                    // what is kind of cool is that we'll start the function
                    callBack(list[i], i);

                }
            };
budgetController
            nodeListForEach(fields, function(current, index){
                
                // if statement because we don't want to do this for zero.
                if (percentages[index] > 0){

                        // the getPercentages method in the budgetController object returns a list of all percentages.  That's what we'll be passing to this.
                    current.textContent = percentages[index] +'%';
                } else {
                    current.textContent = '---';
                };

                
            })
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

        // This listens for clicks and invokes a function to delete the item that was clicked.    We are listening on DOM.container because that is the lowest-level DOM element that contains both the Incomes and Expenses elements.
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

    };

    // Does everything needed to add a new entry to the database, return those values, and put them in the DOM.
    var updateBudget = function(){
        
        // Running this creates the values for total expenses, total income, budget, and percentage in the database.
        budgetCtrl.calculateBudget();
        
        // running this gets those values generated by calculateBudget() from the database and returns them as an object.
        var budget = budgetCtrl.getBudget();
        
        UIctrl.displayBudget(budget);
    };
    var updatePercentages = function(){

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Get percentages from budgetController
        var percentages = budgetCtrl.getPercentages();
        // 3. Update UI
        UIctrl.displayPercentages(percentages);


    };

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

            updatePercentages();

        };

    };

    var ctrlDeleteItem = function(event){

        var itemID, splitID, type, ID;

        // Gets the target of the click event (<i></i>) then looks 4 parent nodes up the tree, and gets the ID of that node.  Target just means the element that was clicked on.
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        // if() statement so we only run this operation if we find an ID on the element.  This works because the Income and Expenses are the ONLY elements with IDs in the entire DOM.  
        if(itemID){

            // The ItemID is the unique ID that each Expense or Income element  has generated for it by the addItem method of budgetController.  This take the string and returns an array containing two strings - whatever it found before the argument, and whatever it found after.
            splitID = itemID.split("-");
            
            // we need the type to know whether to look in Income or Expense
            type = splitID[0];

            // we need to know the unique ID because we are going to delete this from the DB and the DOM.
            ID = parseInt(splitID[1]);

            // 1.  Delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            // 2.  Delete item from UI
            UIctrl.deleteListItem(itemID);
            // 3.  Update and show new budget
            updateBudget();

            updatePercentages();

        }
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

// passing these two arguments in parentheses after the definition means that this function is invoked instantly.  IIOW, as soon as the program gets to here, controller    is run.  
})(budgetController, UIController)

controller.init();