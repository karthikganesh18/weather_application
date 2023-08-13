function searchLocation() {
  var inputElement = document.getElementById('locationInput');
  var location = inputElement.value;
  var errorMessage = document.getElementById('errorMessage');
  var weatherBox = document.getElementById('weatherBox');

  var apiKey = '6cbc0e3b6f01363f89330137ff1f7e58';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var conditionElement = document.getElementById('condition');
      var temperatureElement = document.getElementById('temperature');
      var humidityElement = document.getElementById('humidity');
      var weatherIconElement = document.getElementById('weatherIcon');
      var weatherImageElement = document.getElementById('weatherImage');

      conditionElement.textContent = data.weather[0].description;
      temperatureElement.textContent = data.main.temp;
      humidityElement.textContent = data.main.humidity + '%';

      var weatherIconClass = getWeatherIconClass(data.weather[0].main);
      weatherIconElement.className = weatherIconClass;

      var weatherImageSrc = getWeatherImage(data.weather[0].main);
      weatherImageElement.src = weatherImageSrc;

      errorMessage.style.display = 'none';
      weatherBox.style.display = 'block';
    })
    .catch(error => {
      if (error.message === 'City not found') {
        weatherBox.style.display = 'none';
        errorMessage.style.display = 'block';
      } else {
        console.error('Error fetching weather data:', error);
      }
    });
}

function getWeatherIconClass(condition) {
  // Replace this with your icon selection logic if any.
}

function getWeatherImage(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'https://www.clipartmax.com/png/small/102-1028104_sun-emoji-emojis-emojisticker-sunrise-sunset-sunny-sun-and-cloud-emoji.png';
    case 'clouds':
      return 'https://clipground.com/images/cloud-emoji-clipart-9.jpg';
    case 'rain':
      return 'https://emojis.wiki/emoji-pics/facebook/cloud-with-lightning-facebook.png';
    case 'haze':
      return 'https://icons.veryicon.com/png/Nature/Weather/Haze.png';
    case 'sunny':
      return 'https://i.huffpost.com/gen/1859732/thumbs/o-SUNNY-570.jpg?6';
    case 'mist':
      return 'https://wallup.net/wp-content/uploads/2018/03/19/575251-sky-mist-landscape.jpg';
    default:
      return '';
  }
}