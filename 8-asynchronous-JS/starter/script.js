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
