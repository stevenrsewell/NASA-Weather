async function getWeather() {
  const zipCode = document.getElementById('zipCodeInput').value;
  const apiKey = '6000229ba681c93b80335817e159fb87'; // Replace with your actual API key
  const weatherInfoDiv = document.getElementById('weatherInfo');

  // Clear previous weather information
  weatherInfoDiv.innerHTML = '';

  try {
    // Fetch current weather
    const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`);
    const currentWeatherData = await currentResponse.json();

    // Display current weather if available
    if (currentWeatherData.weather && currentWeatherData.weather.length > 0 && currentWeatherData.main) {
      const temperature = Math.round(currentWeatherData.main.temp);
      const unit = '°F';
      const sunriseTime = new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const temperatureInfo = document.createElement('p');
      temperatureInfo.textContent = `Current Weather: ${currentWeatherData.weather[0].description}, ${temperature}${unit}<br>Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;
      weatherInfoDiv.appendChild(temperatureInfo);
    } else {
      throw new Error('Invalid data received from the weather API');
    }

    // Fetch 5-day forecast
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastResponse.json();

    // Group forecast data by date
    const dailyForecasts = {};
    forecastData.list.forEach(entry => {
      const date = entry.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(entry);
    });

    // Create Bootstrap cards for the next 5 days' forecast
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('row', 'justify-content-start', 'gy-4');

    // Display high and low temperatures for each day
    Object.keys(dailyForecasts).slice(0, 5).forEach(date => {
      const dailyData = dailyForecasts[date];
      const highTemp = Math.round(Math.max(...dailyData.map(entry => entry.main.temp_max)));
      const lowTemp = Math.round(Math.min(...dailyData.map(entry => entry.main.temp_min)));

      const card = document.createElement('div');
      card.classList.add('col-12', 'col-md-4');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card', 'text-center', 'h-100');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = new Date(dailyData[0].dt * 1000).toLocaleDateString();

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = `<strong>Weather:</strong> ${dailyData[0].weather[0].description}<br><strong>High:</strong> ${highTemp}°F<br><strong>Low:</strong> ${lowTemp}°F`;

      const weatherIconContainer = document.createElement('div');
      weatherIconContainer.classList.add('d-flex', 'justify-content-center');

      const weatherIcon = document.createElement('img');
      const iconCode = dailyData[0].weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
      
      weatherIconContainer.appendChild(weatherIcon);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(weatherIconContainer);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);
    });

    weatherInfoDiv.appendChild(cardContainer);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoDiv.textContent = 'Failed to fetch weather data. Please try again.';
  }
}
