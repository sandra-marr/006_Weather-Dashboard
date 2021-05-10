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
  
    if (cityInput) {
      $('#city').text(cityInput + ", ");
      getInitialWeatherData(cityInput)
    };
};

var buttonClickHandler2 = function (event) {
  event.preventDefault();

  var cityInput = $('#cityInput').val();
  var stateInput = $('#stateInput').val();
  var countryInput = $('#countryInput').val();
  
  if (cityInput && stateInput && countryInput) {
    $('#city').text(cityInput + ", " + stateInput + ", " + countryInput);
    var q = cityInput+","+stateInput+","+countryInput;
    console.log(q)
    getInitialWeatherData(q);
    return;
  };
  if (cityInput && stateInput) {
    $('#city').text(cityInput + ", " + stateInput);
    var q = cityInput+","+stateInput;
    console.log(q)
    getInitialWeatherData(q);
    return;
  };
  if (cityInput && countryInput) {
    $('#city').text(cityInput + ", " + countryInput);
    var q = cityInput+","+countryInput;
    console.log(q)
    getInitialWeatherData(q);
    return;
  };
  if (cityInput) {
    $('#city').text(cityInput);
    var q = cityInput;
    getInitialWeatherData(q);
    return;
  };

    $('#myModal').modal('show')

   
};

var getInitialWeatherData = function (q) {



    var apiCityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + q + '&cnt=5&units=imperial&appid=5e948a33c4b15c48b8be4cbafe01ae09';

  
    fetch(apiCityUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            getFinalWeatherData(lon, lat);

          });
        } else {
          cityInput = $('#city').text("Seattle");
          $('#myModal').modal('show')
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

            function currentUviCheck () {
          
              if(currentUvIndex <= 2){
                $('.currentUvi').addClass("uvLow")
              } else if(currentUvIndex <= 5){
                $('.currentUvi').addClass("uvMed")
              } else if(currentUvIndex <= 7){
                $('.currentUvi').addClass("uvHigh")
              } else if(currentUvIndex <= 10){
                $('.currentUvi').addClass("uvVeryHigh")
              } else {
                $('.currentUvi').addClass("uvExtreme")
              }};
          
            currentUviCheck();

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
  

 
// from w3 schools and stack overflow; conditional ? value if true : value if false --- if local storage has a value for search history, then return the object for search history, otherwise return a blank array. 
  var citySearchHistory = (localStorage.citySearchHistory) ? JSON.parse(localStorage.citySearchHistory) : [];

  $('#searchButton').on('click', function(event){
    event.preventDefault();
    citySearchHistory.push($('#cityInput').val());
    localStorage.citySearchHistory = JSON.stringify(citySearchHistory);
    })

  document.querySelector('#cityInput').addEventListener("focus", () => {

    var displayData = document.querySelector("datalist#searchdatacity");

    displayData.innerHTML = "";

    citySearchHistory.forEach((search) => {
      displayData.innerHTML = '<option>' + displayData.innerHTML;
      displayData.querySelector('option').textContent = search;

    });

  }); 

  var stateSearchHistory = (localStorage.stateSearchHistory) ? JSON.parse(localStorage.stateSearchHistory) : [];

  $('#searchButton').on('click', function(event){
    event.preventDefault();
    stateSearchHistory.push($('#stateInput').val());
    localStorage.stateSearchHistory = JSON.stringify(stateSearchHistory);
    })

  document.querySelector('#stateInput').addEventListener("focus", () => {

    var displayData = document.querySelector("datalist#searchdatastate");

    displayData.innerHTML = "";

    stateSearchHistory.forEach((search) => {
      displayData.innerHTML = '<option>' + displayData.innerHTML;
      displayData.querySelector('option').textContent = search;

    });

  }); 

  var countrySearchHistory = (localStorage.countrySearchHistory) ? JSON.parse(localStorage.countrySearchHistory) : [];

  $('#searchButton').on('click', function(event){
    event.preventDefault();
    countrySearchHistory.push($('#countryInput').val());
    localStorage.countrySearchHistory = JSON.stringify(countrySearchHistory);
    })

  document.querySelector('#countryInput').addEventListener("focus", () => {

    var displayData = document.querySelector("datalist#searchdatacountry");

    displayData.innerHTML = "";

    countrySearchHistory.forEach((search) => {
      displayData.innerHTML = '<option>' + displayData.innerHTML;
      displayData.querySelector('option').textContent = search;

    });

  }); 

  $('.cityButtons').on('click', buttonClickHandler);
  $('#searchButton').on('click', buttonClickHandler2);
  $(document).ready(getInitialWeatherData('Seattle'));

  $('#searchButton').on('click', () => {
    $('input').val('');
  })


