const apiKey = `ff75f3cbfa0c9aa6133e938e9de896a8`;
const limit = `5`;

function getLocation() {
    const citySearch = document.getElementById('searchBar').value;
    const reqLocUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=${limit}&appid=${apiKey}`;

    fetch(reqLocUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log('Error fetching location data:', error);
    });
   
}
//     .then(function (location) {
//         const locations = location[0];
//         console.log(locations)
//       })
    
// }

// function getWeather() {
//     const reqWetUrl = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={ff75f3cbfa0c9aa6133e938e9de896a8}"

//     fetch(reqWetUrl)
//     .then(function (response) {
//         console.log(response);
//       return response.json();
//     })
//     .then(function (weather) {
//       console.log(weather);
//     })  
// }

document.getElementById('searchButton').addEventListener("click", getLocation);

// http://api.openweathermap.org/geo/1.0/direct?q=Tallahassee&limit=5&appid=ff75f3cbfa0c9aa6133e938e9de896a8