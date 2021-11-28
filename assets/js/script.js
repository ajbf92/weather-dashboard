var currentDay = document.getElementsByClassName("current-day");
var searchHistoryList = document.querySelector("ul");
let searchHistoryArr = [];

var runSearch = function () {
  var locationRequested = document.getElementById("search-bar").value;
  createNAddButton(locationRequested);
  createEl(currentDay);
  fetch(requestUrlCurrent(locationRequested))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      CurrentStats(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      fetch (requestUrl5Days(lat, lon))
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          UVI(data);
        })
    })
clearInfo();
};

// functions within runSearch
var requestUrlCurrent = function (locationRequested) {
  var requestUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationRequested +
    "&units=imperial&appid=01cf9d1edee20eca447b27b51d4fdc55";
  return requestUrlCurrent;
};
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
var createNAddButton = function (locationRequested) {
  // create a search history under the search bar
  var listItemCity = document.createElement("button");
  listItemCity.id = locationRequested;
  listItemCity.className = "searchHistoryButtons";
  listItemCity.textContent = locationRequested;
  checkButton(listItemCity);
};
var createEl = function(currentDay) {
  var infoDivEl = document.createElement("div");
  infoDivEl.className = "info";
  currentDay[0].appendChild(infoDivEl);
  var ulEl = document.createElement("ul")
  ulEl.id = "current-day-info";
  infoDivEl.appendChild(ulEl);
};
var CurrentDate = function () {
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
var CurrentStats = function (data) {
  var currentDayList = document.getElementById("current-day-info");
  // City Name
  var cityNameLI = document.createElement("h4");
  cityNameLI.className = "city-name";
  cityNameLI.textContent = data.name + CurrentDate();
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
// need to style the UV index with colors 
var UVI = function (data) {
  var currentDayList = document.getElementById("current-day-info");
  var uviLI = document.createElement("li");
  uviLI.textContent = "UV Index: " + data.current.uvi;
  currentDayList.appendChild(uviLI);
}
var ForecastAhead = function (data) {
  var forecastedDays = [data[0], data[1], data[2], data[3], data[4]];
  for (i=0; i<forecastedDays.length; i++) {
    forecastStats([i]);
    
  }
};
var forecastStats = function () {
  var createBoxEl = document.createElement("div")


// date icon temperature wind speed and humidity
}
var runSearchHistoryItem = function (event) {
  var locationRequested = event.target.id;
  document.getElementById("search-bar").value = locationRequested;
  runSearch(locationRequested);
};
var clearInfo = function () {
  var selectedArea = document.getElementById("current-day-info");
  selectedArea.textContent = "";
};
$(".search-history").on("click", runSearchHistoryItem);
$("#search-button").on("click", runSearch);
