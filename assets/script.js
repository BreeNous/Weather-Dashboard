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
      console.log(data);

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
      console.log(data);

      const dayOneWeather = {
        date: data.list[0].dt_txt,
        icon: '',
        temp: '',
        wind: '',
        humidity: ''
      }
      const dayTwoWeather = {
        date: data.list[0].dt_txt,
        icon: '',
        temp: '',
        wind: '',
        humidity: ''
      }
      const dayThreeWeather = {
        date: data.list[0].dt_txt,
        icon: '',
        temp: '',
        wind: '',
        humidity: ''
      }
      const dayFourWeather = {
        date: data.list[0].dt_txt,
        icon: '',
        temp: '',
        wind: '',
        humidity: ''
      }
      const dayFiveWeather = {
        date: data.list[0].dt_txt,
        icon: '',
        temp: '',
        wind: '',
        humidity: ''
      }
      console.log(currentWeather);
      let fiveDaysArr = [dayOneWeather, dayTwoWeather, dayThreeWeather, dayFourWeather, dayFiveWeather];
      return fiveDaysArr;
    })  
}

document.getElementById('searchButton').addEventListener("click", getLocation);
