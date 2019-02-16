function getWeather(woeid){

    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`).then( (result) => {
        return result.json();
    })
    .then((data)=>{
        const today = data.consolidated_weather[0];
        console.log(`Temperatures in ${data.title} stay between ${Math.round(today.min_temp)} and ${Math.round(today.max_temp)} degrees C`);
    })
    .catch( (error) => {console.log(error)});
}
getWeather(2487956);
getWeather(44418);

// Here's the version with async/await
async function getWeatherAW(woeid){

    // the code will try to execute everything in curly brackets, but if there is an errory, the catch() function will be run instead.
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)

        const data = await result.json()
        const tomorrow = data.consolidated_weather[1];

        console.log(`Temperatures in ${data.title} tomorrow will be between ${Math.round(tomorrow.min_temp)} and ${Math.round(tomorrow.max_temp)} degrees C`);

        return data;
    } catch(error){
        console.log(error);
    }
    
}
getWeatherAW(2487956);


let dataLondon;
getWeatherAW(44418).then((data) => {
    dataLondon = data
    console.log(dataLondon);
});

