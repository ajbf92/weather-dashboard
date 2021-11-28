var searchHistoryList = document.querySelector("ul");
var currentDayList = document.getElementById("current-day-info");
let searchHistoryArr = [];

var runSearch = function () {
  var locationRequested = document.getElementById("search-bar").value;
  createNAddButton(locationRequested);
  clearInfo();
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
var CurrentDate = function () {
  var currentDate = new Date();
  var date =
    " (" +
    currentDate.getDay() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    ")";
  return date;
};
var CurrentStats = function (data) {
  var cityNameLI = document.createElement("h4");
  cityNameLI.className = "city-name";
  cityNameLI.textContent = data.name + CurrentDate();
  currentDayList.appendChild(cityNameLI);
  var img = document.createElement("img");
  img.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  currentDayList.appendChild(img);
  var currentTemperatureLI = document.createElement("li");
  currentTemperatureLI.textContent = "Temp: " + data.main.temp + "F";
  currentDayList.appendChild(currentTemperatureLI);
  var currentHumidityLI = document.createElement("li");
  currentHumidityLI.textContent = "Humidity: " + data.main.humidity + "%";
  currentDayList.appendChild(currentHumidityLI);
  var currentWindSpeedLI = document.createElement("li");
  currentWindSpeedLI.textContent = "Wind: " + data.wind.speed + " MPH";
  currentDayList.appendChild(currentWindSpeedLI);
};
var UVI = function (data) {
  var uviLI = document.createElement("li");
  uviLI.textContent = "UV Index: " + data.current.uvi;
  currentDayList.appendChild(uviLI);
}
// var ForecastAhead = function (data) {};
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
