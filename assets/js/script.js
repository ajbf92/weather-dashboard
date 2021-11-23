var searchHistoryList = document.querySelector("ul");

var runSearch = function () {
    var locationRequested = document.getElementById("search-bar").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + locationRequested + "&appid=01cf9d1edee20eca447b27b51d4fdc55";
    
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        console.log(requestUrl);

    // create a search history under the search bar 
    var listItemCity = document.createElement('h4');
    listItemCity.textContent = locationRequested;
    searchHistoryList.appendChild(listItemCity);
    }

$("#search-button").on("click", runSearch);