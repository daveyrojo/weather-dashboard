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

fetch('http://maps.openweathermap.org/maps/2.0/weather/TA2/{1}/{1}/{1}&opacity=0.9&fill_bound=true&appid={9047fd95b48c3207edabe682c3c9a6bf}')
    .then(function (response) {
        console.log(response.status);
      
    })

    .then(function (data) {
        console.log(data);
    });