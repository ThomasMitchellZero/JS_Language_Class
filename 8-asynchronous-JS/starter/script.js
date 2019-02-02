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


// I get returning a promise.  What I don't get how all the different arguments end up where they do.  Need to untangle tomorrow.
const getRecipe = recID =>{
    return new Promise((resolve, reject) => {
        setTimeout((ID) => {
            const recipe = {
                title: "fresh tomato pasta",
                publisher: "Jonas",}
            resolve(`${ID}: ${recipe.title}`);

        // remember, for Timeout, any arguments after the first two (the callback and the time to wait) will be passed into the callback in the order they are recieved.  In this case, it's recID.  So whatever argument is passed into RecID when it is called will in turn be passed as an argument into setTimeout.  

        // Also remember that knowing the ins and outs of setTimeout is not critical.  We're just using that to simulate the demands of an external API call.

        }, 1500, recID);


    });
};

// the argument being passed to the callback, i.e. IDs, is what will be returned if the promise is resolved.  In this case, it's the array of numbers.

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