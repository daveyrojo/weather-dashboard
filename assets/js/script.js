// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//need to create variable for city based off of button submit value
//'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + API_KEY
// let cityVal = document.querySelector('#city');

//document.querySelector('#city');

let weatherSearch = document.querySelector('#searchWeather');

weatherSearch.addEventListener('click', function(){
    let cityName = document.querySelector('#city').value; 
    if (cityName != '') {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + API_KEY)
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })

            .then(function (weather) {
                console.log(weather);
            })
    } else {
        confirm('City Name Needed to Search');
        return;
    }
    

});
    
