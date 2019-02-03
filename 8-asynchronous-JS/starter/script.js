/*

function getRecipe() {
    
    // this is to simulate sending a request to an external API and getting a response back.
    setTimeout(()=>{

        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);
    
        // After we choose an ID, this second Timeout will simulate the recipe coming back in from the server.

        // Defining a parameter that the callback will take, ID 
        setTimeout(id =>{
            const recipe = {title: "fresh tomato pasta",
            publisher: "Jonas",}
            console.log(`${id}: ${recipe.title}`);

            setTimeout( publisher =>{
                const recipe = {
                    title: 'Omelete',
                    publisher: publisher,
                }
                console.log(recipe);
            }, 1500, recipe.publisher)

        // the first two arguments for setTimeout are the callback function and the amount of time to delay.  Any arguments after that are passed as arguments to the callback function.
        }, 1500, recipeID[2])

    }, 1500)
}

getRecipe();

*/

// the Promise takes 2 parameters, resolve and reject.  If the promise resolves, it returns the contents of resolve, and vice versa.
const getIDs = new Promise( (resolve, reject)=> {
    setTimeout(()=>{
        resolve([523, 883, 432, 974]);
    }, 1500);
});



// getRecipe is a function, and it accepts a parameter (recID).  When it runs, it will creat a an unnamed Promise.  Is this how you pass additional arguments into a Promise?
const getRecipe = function(recID){

    // this is the promise that comes back.  First argument is the callback to be run.
    return new Promise(function(resolve, reject){
        
        //the argument passed to recID will in turn be passed here, to ID.   
        setTimeout(function(ID){
            const recipe = {
                title: "fresh tomato pasta",
                publisher: "Jonas",}
            // here's where we FINALLY use the argument that was passed to the function, to setTimeout, and then finally to this template string as ID.
            resolve(`${ID}: ${recipe.title}`);

        // recID is the outside parameter we want to pass into the promise.  Remember, for setTimeout the first two parameters are the callback and the wait time.  Additional arguments are passed INTO the callback function.
        }, 1500, recID);


    });
};


// First, we are going to consume the getIDs promise.  Get IDs waits 15 seconds, then returns the array.  

getIDs.then(IDs => {
    console.log(IDs);
    // AFAICT, this is the real key to the pattern.  GetRecipe returns a promise, and then we chain it into another .then()  call.
    return getRecipe(IDs[2])
})

// A normal pattern is to chain the functions like this.  .catch runs if the promise is rejected, and the error parameter is whatever is returned by the 'reject' 
.then( recipe =>{
    console.log(recipe);
})

.catch(error => {
    console.log("epic fails.")
})