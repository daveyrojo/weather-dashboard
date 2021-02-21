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

//global variables
let weatherSearch = document.querySelector('#searchWeather');
let timePeriodEl = document.querySelector('#daysToForecast')
let forecastEl = document.querySelector('#forecast');
let cityEl = document.querySelector('#cityChosen');
let dateEl = document.querySelector('#date');
let humidityEl = document.querySelector('#humidity');
let windSpeedEl = document.querySelector('#windSpeed');
let tempEl = document.querySelector('#temp');

weatherSearch.addEventListener('click', function(){
    let cityName = document.querySelector('#city').value; 
    if (cityName != '' && timePeriodEl === 'Today') {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + API_KEY)
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })

            .then(function (weather) {
                console.log(weather);
                //city name, date, icon representing weather, temp, humidity, wind speed, UV index
                let city = weather.name;
                let temperature = weather.main.temp;
                let humidity = weather.main.humidity;
                let windSpeed = weather.wind.speed;
                cityEl.innerText = 'City: ' + city;
                tempEl.innerText = 'Temperature: ' + temperature + ' F';
                humidityEl.innerText = 'Humidity: ' + humidity + '%';
                windSpeedEl.innerText = 'Wind Speed: ' + windSpeed + ' mph';

                

            })
    } else {
        confirm('City Name Needed to Search');
        return;
    }
    

});
    
