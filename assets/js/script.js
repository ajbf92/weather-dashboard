var runSearch = function () {
    console.log("it works");
    var locationRequested = document.getElementById("search-bar").value
    console.log(locationRequested);
    getUserRepos(locationRequested);
}

var getUserRepos = function (){
    fetch(https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key})
}

$("#search-button").on("click", runSearch);