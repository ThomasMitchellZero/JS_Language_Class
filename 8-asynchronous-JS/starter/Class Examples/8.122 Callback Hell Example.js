


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