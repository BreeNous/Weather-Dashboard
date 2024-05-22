const apiKey = `ff75f3cbfa0c9aa6133e938e9de896a8`;
// const limit = `1`;

function getLocation() {
    const citySearch = document.getElementById('searchBar').value;
    const reqLocUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&appid=${apiKey}`;

    fetch(reqLocUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const location = {
            lat: data[0].lat,
            lon: data[0].lon
        }
        console.log(location);

        getWeather(location.lat, location.lon)
    })
    .catch(function(error) {
        console.log('Error fetching location data:', error);
    });
   
}

function getWeather(lat, lon) {
    const locLat = lat;
    const locLon = lon;
    const reqWetUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locLat}&lon=${locLon}&appid=${apiKey}`;

    fetch(reqWetUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data);

      const weatherData = {
        cityId: data.city.id,
        cityName: data.city.name,


      }
      console.log(weatherData);
    })  
}

document.getElementById('searchButton').addEventListener("click", getLocation);
