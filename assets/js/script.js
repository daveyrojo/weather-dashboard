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
let uvIndex = document.querySelector('#uvIndex');
let fiveDayEl = document.querySelector('#fiveDay');


//function starts on button click
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
                let lat = data.city.coord.lat;
                let lon = data.city.coord.lon;
               
                // console.log(lat, lon);
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&appid=' + API_KEY)
                    .then( function(response){
                        return response.json();
                    })

                    .then(function (uvData) {
                        console.log(uvData);
                        let uvi = uvData.current.uvi;
                        if (uvi <4) {
                            uvIndex.innerHTML = '<p class="text-success">UV Index: ' + uvi + '</p>'
                        } else if (uvi > 4 && uvi < 7) {
                            uvIndex.innerHTML = '<p class="text-warning"> UV Index: ' + uvi + '</p>'
                        } else {
                            uvIndex.innerHTML = '<p class="text-danger"> UV Index: ' + uvi + '</p>'
                        }
                    })
                    console.log(uvi);
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
                // console.log(reformatDate);
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
                let lat = data.city.coord.lat;
                let lon = data.city.coord.lon;
            
                // console.log(lat, lon);
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY)
                    .then(function (response) {
                        return response.json();
                    })

                    .then(function (uvData) {
                        console.log(uvData);
                        let uvi = uvData.current.uvi;
                        if (uvi < 4) {
                            uvIndex.innerHTML = '<p class="text-success">UV Index: ' + uvi + '</p>'
                        } else if (uvi > 4 && uvi < 7) {
                            uvIndex.innerHTML = '<p class="text-warning"> UV Index: ' + uvi + '</p>'
                        } else {
                            uvIndex.innerHTML = '<p class="text-danger"> UV Index: ' + uvi + '</p>'
                        }
                    })

                let city = data.city.name + ' ' + data.city.country;
                cityEl.innerText ='City: ' + city; //data.city.name + ' ' + data.city.country;
                let array = data.list;
                console.log(array);
                    let dayOne = array[0];
                    let dayOneTemp = dayOne.main.temp;
                    let dayOneHum = dayOne.main.humidity;
                    let dayOneWS = dayOne.wind.speed;
                    let dayOneIcon = dayOne.weather[0].icon;
                    let dayOneDateTime = dayOne.dt_txt.split(' ');
                    let dayOneReformat = dayOneDateTime[0].split('-');
                    let dayOneDate = 'Date: ' + dayOneReformat[1] + '-' + dayOneReformat[2] + '-' + dayOneReformat[0];

                    let firstDayEl = document.createElement('DIV');

                    firstDayEl.innerHTML = '<p>' + dayOneDate + '</p>' +
                        '<p> Temp: ' + dayOneTemp + 'F</p>' + 
                        '<p>Humidity: ' + dayOneHum + '%</p>' +
                        '<p>Wind Speed: ' + dayOneWS + ' mph</p>' +
                        '<img src="http://openweathermap.org/img/w/"' + dayOneIcon +'>';
                    
                    document.getElementById('day1').append(firstDayEl);

                    let dayTwo = array[8];
                        let dayTwoTemp = dayTwo.main.temp;
                        let dayTwoHum = dayTwo.main.humidity;
                        let dayTwoWS = dayTwo.wind.speed;
                        let dayTwoIcon = dayTwo.weather[0].icon;
                        let dayTwoDateTime = dayTwo.dt_txt.split(' ');
                        let dayTwoReformat = dayTwoDateTime[0].split('-');
                        let dayTwoDate = 'Date: ' + dayTwoReformat[1] + '-' + dayTwoReformat[2] + '-' + dayTwoReformat[0];
                    
                        let secondDayEl = document.createElement('DIV');

                        secondDayEl.innerHTML = '<p>' + dayTwoDate + '</p>' +
                    '<p> Temp: ' + dayTwoTemp + 'F</p>' +
                    '<p>Humidity: ' + dayTwoHum + '%</p>' +
                    '<p>Wind Speed: ' + dayTwoWS + ' mph</p>' +
                    '<img src="http://openweathermap.org/img/w/"' + dayTwoIcon + '>';

                document.getElementById('day2').append(secondDayEl);

                    let dayThree = array[16];
                        let dayThreeTemp = dayThree.main.temp;
                        let dayThreeHum = dayThree.main.humidity;
                        let dayThreeWS = dayThree.wind.speed;
                        let dayThreeIcon = dayThree.weather[0].icon;
                        let dayThreeDateTime = dayThree.dt_txt.split(' ');
                        let dayThreeReformat = dayThreeDateTime[0].split('-');
                        let dayThreeDate = 'Date: ' + dayThreeReformat[1] + '-' + dayThreeReformat[2] + '-' + dayThreeReformat[0];

                        let thirdDayEl = document.createElement('DIV');

                        thirdDayEl.innerHTML = '<p>' + dayThreeDate + '</p>' +
                            '<p> Temp: ' + dayThreeTemp + 'F</p>' +
                            '<p>Humidity: ' + dayThreeHum + '%</p>' +
                            '<p>Wind Speed: ' + dayThreeWS + ' mph</p>' +
                            '<img src="http://openweathermap.org/img/w/"' + dayThreeIcon + '>';

                document.getElementById('day3').append(thirdDayEl);

                        let dayFour = array[24];

                        let dayFourTemp = dayFour.main.temp;
                        let dayFourHum = dayFour.main.humidity;
                        let dayFourWS = dayFour.wind.speed;
                        let dayFourIcon = dayFour.weather[0].icon;
                        let dayFourDateTime = dayFour.dt_txt.split(' ');
                        let dayFourReformat = dayFourDateTime[0].split('-');
                        let dayFourDate = 'Date: ' + dayFourReformat[1] + '-' + dayFourReformat[2] + '-' + dayFourReformat[0];

                        let fourthDayEl = document.createElement('DIV');

                        fourthDayEl.innerHTML = '<p>' + dayFourDate + '</p>' +
                            '<p> Temp: ' + dayFourTemp + 'F</p>' +
                            '<p>Humidity: ' + dayFourHum + '%</p>' +
                            '<p>Wind Speed: ' + dayFourWS + ' mph</p>' +
                            '<img src="http://openweathermap.org/img/w/"' + dayFourIcon + '>';

                document.getElementById('day4').append(fourthDayEl);

                    let dayFive = array[32];


                let dayFiveTemp = dayFive.main.temp;
                let dayFiveHum = dayFive.main.humidity;
                let dayFiveWS = dayFive.wind.speed;
                let dayFiveIcon = dayFive.weather[0].icon;
                let dayFiveDateTime = dayFive.dt_txt.split(' ');
                let dayFiveReformat = dayFiveDateTime[0].split('-');
                let dayFiveDate = 'Date: ' + dayFiveReformat[1] + '-' + dayFiveReformat[2] + '-' + dayFiveReformat[0];

                let fifthDayEl = document.createElement('DIV');

                fifthDayEl.innerHTML = '<p>' + dayFiveDate + '</p>' +
                    '<p> Temp: ' + dayFiveTemp + 'F</p>' +
                    '<p>Humidity: ' + dayFiveHum + '%</p>' +
                    '<p>Wind Speed: ' + dayFiveWS + ' mph</p>' +
                    '<img src="http://openweathermap.org/img/w/' + dayFiveIcon + '">';

                document.getElementById('day5').append(fifthDayEl);
                    

                // console.log(city);
            })
    } else {
        confirm('City Name Needed to Search');
        return;
    }
    

});

