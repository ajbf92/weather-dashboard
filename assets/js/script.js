var currentDay = document.getElementsByClassName("current-day");
var fiveDayForecast = document.getElementsByClassName("5-day-forecast");
var searchHistoryList = document.querySelector("ul");
let searchHistoryArr = [];

var runSearch = function () {
  var locationRequested = document.getElementById("search-bar").value;
  createNAddButton(locationRequested);
  infoDivEl(currentDay);
  fetch(requestUrlCurrent(locationRequested))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentStats(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      fetch (requestUrl5Days(lat, lon))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          UVI(data);
          forecastDivEl(fiveDayForecast);
          forecastAhead(data);
        })

        console.log(requestUrl5Days(lat, lon));
    })
clearInfo();
};

// functions within runSearch

// gets the current day url
var requestUrlCurrent = function (locationRequested) {
  var requestUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationRequested +
    "&units=imperial&appid=01cf9d1edee20eca447b27b51d4fdc55";
  return requestUrlCurrent;
};

// gets the 5 day forecast url
var requestUrl5Days = function (lat, lon) {
  var requestUrl5Days =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&units=imperial&cnt=5&appid=01cf9d1edee20eca447b27b51d4fdc55";
    console.log(requestUrl5Days);
    return requestUrl5Days;
};

// creates search history button
var createNAddButton = function (locationRequested) {
  // create a search history under the search bar
  var listItemCity = document.createElement("button");
  listItemCity.id = locationRequested;
  listItemCity.className = "searchHistoryButtons";
  listItemCity.textContent = locationRequested;
  checkButton(listItemCity);
};

// checks if button exist/if not it adds it
var checkButton = function (listItemCity) {
  // check if the array is empty; if so add button and update array
  if (searchHistoryArr.length === 0) {
    searchHistoryList.appendChild(listItemCity);
    searchHistoryArr.push(listItemCity);
  } else {
    // if not empty check if the city is in the array; if it is break loop
    let cityExist = false;
    for (i = 0; i < searchHistoryArr.length; i++) {
      if (searchHistoryArr[i].id === listItemCity.id) {
        cityExist = true;
        break;
      }
    }
    // if its not in the array, add button to side menu and update array with new item
    if (cityExist === false) {
      searchHistoryList.appendChild(listItemCity);
      searchHistoryArr.push(listItemCity);
    }
  }
  document.getElementById("search-bar").value = "";
};

// creates div for current day
var infoDivEl = function(currentDay) {
  var currentDayHeader = document.createElement("h2");
  currentDayHeader.textContent= "Current Day Forecast";
  currentDay[0].appendChild(currentDayHeader);
  var infoDivEl = document.createElement("div");
  infoDivEl.className = "info";
  currentDay[0].appendChild(infoDivEl);
  var ulEl = document.createElement("ul");
  ulEl.id = "current-day-info";
  infoDivEl.appendChild(ulEl);
};

// gets the current date
var currentDate = function () {
  var currentDate = new Date();
  var date =
    " (" +
    (currentDate.getMonth() +1) +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear() +
    ")";
  return date;
};

// gets current stats and appends them to current day div
var currentStats = function (data) {
  var currentDayList = document.getElementById("current-day-info");
  // City Name
  var cityNameLI = document.createElement("h4");
  cityNameLI.className = "city-name";
  cityNameLI.textContent = data.name + currentDate();
  currentDayList.appendChild(cityNameLI);
  // Weather Icon
  var img = document.createElement("img");
  img.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  currentDayList.appendChild(img);
  // Temperature
  var currentTemperatureLI = document.createElement("li");
  currentTemperatureLI.textContent = "Temp: " + data.main.temp + "F";
  currentDayList.appendChild(currentTemperatureLI);
  // Humidity
  var currentHumidityLI = document.createElement("li");
  currentHumidityLI.textContent = "Humidity: " + data.main.humidity + "%";
  currentDayList.appendChild(currentHumidityLI);
  // Wind Speed
  var currentWindSpeedLI = document.createElement("li");
  currentWindSpeedLI.textContent = "Wind: " + data.wind.speed + " MPH";
  currentDayList.appendChild(currentWindSpeedLI);
};

// gets the UVI to then append to current day div (need to style the UV index with colors) 
var UVI = function (data) {
  var currentDayList = document.getElementById("current-day-info");
  var uviLI = document.createElement("li");
  uviLI.textContent = "UV Index: " + data.current.uvi;
  currentDayList.appendChild(uviLI);
}

// creates div for 5 day forecast
var forecastDivEl = function (fiveDayForecast) {
  var forecastHeader = document.createElement("h2");
  forecastHeader.textContent= "5-Day Forecast";
  fiveDayForecast[0].appendChild(forecastHeader);
  var forecastDiv = document.createElement("div")
  forecastDiv.className = "row info"
  fiveDayForecast[0].appendChild(forecastDiv)
}

// loops through array of 5 days and runs forecastStats()
var forecastAhead = function (data) {
  var forecastedDays = [[data.daily[1]],[data.daily[2]],[data.daily[3]],[data.daily[4]],[data.daily[5]]];
  for (i=0; i<forecastedDays.length; i++) {
  // var boxEl = document.createElement("div")
  // boxEl.className = "col-2"
  // boxEl.id = "day-"+[i];
  // console.log(boxEl.id);
  // fiveDayForecast[0].appendChild(boxEl);
  // var ulEl = document.createElement("ul");
  // boxEl.appendChild(ulEl);
  forecastStats([i]); 
  }
};

//gets 5 day forecast and appends them
var forecastStats = function ([i]) {
  var forecastDiv = document.getElementsByClassName("row info");
  var boxEl = document.createElement("div")
  boxEl.className = "col-2"
  boxEl.id = "day-"+[i];
  console.log(boxEl.id);
  forecastDiv[0].appendChild(boxEl);
  var ulEl = document.createElement("ul");
  boxEl.appendChild(ulEl);


// date icon temperature wind speed and humidity
};

// runs any button clicked on the side menu 
var runSearchHistoryItem = function (event) {
  var locationRequested = event.target.id;
  document.getElementById("search-bar").value = locationRequested;
  runSearch(locationRequested);
};

// clears the search bar after searching
var clearInfo = function () {
  var selectedArea = document.getElementById("current-day-info");
  selectedArea.textContent = "";
};
$(".search-history").on("click", runSearchHistoryItem);
$("#search-button").on("click", runSearch);
