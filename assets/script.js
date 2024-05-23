const apiKey = `ff75f3cbfa0c9aa6133e938e9de896a8`;


function getLocation(cityName) {
    const reqLocUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(reqLocUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {

        const location = {
            lat: data[0].lat,
            lon: data[0].lon
        }
        return location;
    })
    .then(function(location) {
        currentWeather(location.lat, location.lon);
        return location;
    })
    .then(function(location) {
        futureWeather(location.lat, location.lon);
    })
    .catch(function(error) {
        console.log('Error fetching location data:', error);
    });
   
}

function currentWeather(lat, lon) {
    const locLat = lat;
    const locLon = lon;
    const reqWetUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locLat}&lon=${locLon}&units=metric&appid=${apiKey}`;

    fetch(reqWetUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

      const timestamp = data.dt;
      const date = new Date(timestamp * 1000);
    
      const currentWeather = {
        cityName: data.name,
        date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
        icon: data.weather[0].icon,
        temp: `${Math.round((data.main.temp + 32))} °F`,
        wind: `${data.wind.speed} mph`,
        humidity: `${data.main.humidity} %`
      }
      console.log(currentWeather);
      return currentWeather
    })
};    

function futureWeather(lat, lon) {
    const locLat = lat;
    const locLon = lon;
    const reqWetUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${locLat}&lon=${locLon}&units=metric&appid=${apiKey}`;

    fetch(reqWetUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      const dayOne = new Date(data.list[4].dt * 1000);
      const dayTwo = new Date(data.list[12].dt * 1000);
      const dayThree = new Date(data.list[20].dt * 1000); 
      const dayFour = new Date(data.list[28].dt * 1000);
      const dayFive = new Date(data.list[36].dt * 1000);
      

      const dayOneWeather = {
        date: `${dayOne.getMonth() + 1}/${dayOne.getDate()}/${dayOne.getFullYear()}`,
        icon: data.list[4].weather[0].icon,
        temp: `${Math.round((data.list[4].main.temp + 32))} °F`,
        wind: `${data.list[4].wind.speed} mph`,
        humidity: `${data.list[4].main.humidity} %`
      }
      const dayTwoWeather = {
        date: `${dayTwo.getMonth() + 1}/${dayTwo.getDate()}/${dayTwo.getFullYear()}`,
        icon: data.list[12].weather[0].icon,
        temp: `${Math.round((data.list[12].main.temp + 32))} °F`,
        wind: `${data.list[12].wind.speed} mph`,
        humidity: `${data.list[12].main.humidity} %`
      }
      const dayThreeWeather = {
        date: `${dayThree.getMonth() + 1}/${dayThree.getDate()}/${dayThree.getFullYear()}`,
        icon: data.list[20].weather[0].icon,
        temp: `${Math.round((data.list[20].main.temp + 32))} °F`,
        wind: `${data.list[20].wind.speed} mph`,
        humidity: `${data.list[20].main.humidity} %`
      }
      const dayFourWeather = {
        date: `${dayFour.getMonth() + 1}/${dayFour.getDate()}/${dayFour.getFullYear()}`,
        icon: data.list[28].weather[0].icon,
        temp: `${Math.round((data.list[28].main.temp + 32))} °F`,
        wind: `${data.list[28].wind.speed} mph`,
        humidity: `${data.list[28].main.humidity} %`
      }
      const dayFiveWeather = {
        date: `${dayFive.getMonth() + 1}/${dayFive.getDate()}/${dayFive.getFullYear()}`,
        icon: data.list[36].weather[0].icon,
        temp: `${Math.round((data.list[36].main.temp + 32))} °F`,
        wind: `${data.list[36].wind.speed} mph`,
        humidity: `${data.list[36].main.humidity} %`
      }
      let fiveDaysArr = [dayOneWeather, dayTwoWeather, dayThreeWeather, dayFourWeather, dayFiveWeather];
      console.log(fiveDaysArr);
      return fiveDaysArr;
    })
      
}
function searchLocation() {
    const citySearch = document.getElementById('searchBar').value;
    getLocation(citySearch);
}

function placeHolderWeather() {
    const defaultCity = 'New York';
    getLocation(defaultCity);
}

// Call the placeHolderWeather function on page load
window.onload = placeHolderWeather;

document.getElementById('searchButton').addEventListener("click", searchLocation);
