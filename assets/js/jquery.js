$(document).ready(function(){
    $('#searchWeather').click(function(){
        var city = $('#city').val();

        if (city != ''){

            $.ajax({
                
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city,
                type: 'GET',    
                dataType: 'jsonp',
                success: function(data){
                    
                }
            })

        }else{
            $('#error').html('Field cannot be empty');
        }

    })



});