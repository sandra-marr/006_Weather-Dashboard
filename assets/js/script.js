

var currentDate = moment().format('l');
var currentDateEL = $('.currentDate');

var dayTwo = moment().add(1, 'days').format('l');
var dayThree = moment().add(2, 'days').format('l');
var dayFour = moment().add(3, 'days').format('l');
var dayFive = moment().add(4, 'days').format('l');

currentDateEL.text(" " + currentDate);
$('#date2').text(dayTwo);
$('#date3').text(dayThree);
$('#date4').text(dayFour);
$('#date5').text(dayFive);



var buttonClickHandler = function (event) {
    var cityInput = event.target.getAttribute('data-city');
    console.log(cityInput);
  
    if (cityInput) {
      $('#city').text(cityInput + ", ");
      console.log(cityInput);
      getInitialWeatherData(cityInput)
    };
};

var buttonClickHandler2 = function (event) {
  event.preventDefault();

  var cityInput = $('#formInput').val();
  console.log(cityInput);

  if (cityInput) {
    $('#city').text(cityInput + ", ");
    console.log(cityInput);
    getInitialWeatherData(cityInput)
  };
};

var getInitialWeatherData = function (city) {

    console.log(city);

    var apiCityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=5e948a33c4b15c48b8be4cbafe01ae09';
  
    fetch(apiCityUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            getFinalWeatherData(lon, lat);

          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to weather data');
      });
  };

  var getFinalWeatherData = function (lon, lat) {
    var apiLocationUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=5e948a33c4b15c48b8be4cbafe01ae09'
    fetch(apiLocationUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);

            var currentTemp = data.current.temp;
            var currentWind = data.current.wind_speed;
            var currentHumidity = data.current.humidity;
            var currentUvIndex = data.current.uvi;
            var currentWIcon= data.current.weather[0].icon;

            $('.currentTemp').text(currentTemp + "  " + "\xB0" + "F");
            $('.currentWind').text(currentWind + " MPH");
            $('.currentHumidity').text(currentHumidity + " %");
            $('.currentUvi').text(currentUvIndex);
            $('.currentWeatherIcon').attr('src', 'http://openweathermap.org/img/wn/' + currentWIcon + '@2x.png');

            var dailyTempArr = [];
            var dailyHumidityArr = [];
            var dailyWindArr = [];
            var dailyIconArr = [];

            for( var i=1; i<=4; i++){
            var dailyTemp = data.daily[i].temp.day;
            var dailyWind = data.daily[i].wind_speed;
            var dailyHumidity = data.daily[i].humidity;
            var dailyIcon = data.daily[i].weather[0].icon;

            dailyTempArr.push(dailyTemp);
            dailyWindArr.push(dailyWind);
            dailyHumidityArr.push(dailyHumidity);
            dailyIconArr.push(dailyIcon);
      
            }
        
            
            $('.dayTwoTemp').text(dailyTempArr[0] + "  " + "\xB0" + "F")
            $('.dayThreeTemp').text(dailyTempArr[1] + "  " + "\xB0" + "F")
            $('.dayFourTemp').text(dailyTempArr[2] + "  " + "\xB0" + "F")
            $('.dayFiveTemp').text(dailyTempArr[3] + "  " + "\xB0" + "F")

            $('.dayTwoWind').text(dailyWindArr[0] + " MPH")
            $('.dayThreeWind').text(dailyWindArr[1] + " MPH")
            $('.dayFourWind').text(dailyWindArr[2] + " MPH")
            $('.dayFiveWind').text(dailyWindArr[3] + " MPH")

            $('.dayTwoHum').text(dailyHumidityArr[0] + " %")
            $('.dayThreeHum').text(dailyHumidityArr[1] + " %")
            $('.dayFourHum').text(dailyHumidityArr[2] + " %")
            $('.dayFiveHum').text(dailyHumidityArr[3] + " %")

            $('.dayTwoIcon').attr('src', 'http://openweathermap.org/img/wn/' + dailyIconArr[0] + '@2x.png')
            $('.dayThreeIcon').attr('src', 'http://openweathermap.org/img/wn/' + dailyIconArr[1] + '@2x.png')
            $('.dayFourIcon').attr('src', 'http://openweathermap.org/img/wn/' + dailyIconArr[2] + '@2x.png')
            $('.dayFiveIcon').attr('src', 'http://openweathermap.org/img/wn/' + dailyIconArr[3] + '@2x.png')


          })
        }}
      )
  }
  

  $('.cityButtons').on('click', buttonClickHandler);
  $('#searchButton').on('click', buttonClickHandler2);
  $(document).ready(getInitialWeatherData('Seattle'));


