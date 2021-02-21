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
let iconEl = document.querySelector('#icon');

weatherSearch.addEventListener('click', function(){
    let cityName = document.querySelector('#city').value; 
    if (cityName != '' && timePeriodEl.value == '1') {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + API_KEY)
            .then(function (response) {
                // console.log(response.status);
                return response.json();
            })

            .then(function (data) {
                console.log(data);
                let array = data.list[0];
                console.log(array)
                //UV index 
                let city = data.city.name;
                let temperature = array.main.temp;
                let humidity = array.main.humidity;
                let windSpeed = array.wind.speed;
                let weatherIcon = array.weather[0].icon;
                let date = array.dt_txt.split(' ');
                
                let reformatDate = date[0].split('-');
                console.log(reformatDate);
                // console.log(weatherIcon);
            
                cityEl.innerText = 'Today in: ' + city + ' ' + data.city.country;
                dateEl.innerText = 'Date: ' + reformatDate[1] + '-' + reformatDate[2] + '-' + reformatDate[0];
                iconEl.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
                tempEl.innerText = 'Temperature: ' + temperature + ' F';
                humidityEl.innerText = 'Humidity: ' + humidity + '%';
                windSpeedEl.innerText = 'Wind Speed: ' + windSpeed + ' mph';     
            })
    } else if (cityName != '' && timePeriodEl.value == '2') {
        //write function for 5 day forecast
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + API_KEY)
            .then(function (response) {
                // console.log(response.status);
                return response.json();
            })

            .then(function (data) {
                // console.log(data);

                let city = data.city.name + ' ' + data.city.country;
                cityEl.innerText ='City: ' + city; //data.city.name + ' ' + data.city.country;
                let array = data.list;
                // console.log(array);
                    let dayOne = array[0];
                    let dayTwo = array[8];
                    let dayThree = array[16];
                    let dayFour = array[24];
                    let dayFive = array[32];
                    

                // console.log(city);
            })
    } else {
        confirm('City Name Needed to Search');
        return;
    }
    

});
    
