async function getWeather() {
  const zipCode = document.getElementById('zipCodeInput').value;
  const apiKey = '6000229ba681c93b80335817e159fb87'; // Replace with your actual API key
  const weatherInfoDiv = document.getElementById('weatherInfo');

  // Clear previous weather information
  weatherInfoDiv.innerHTML = '';

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`);
    const weatherData = await response.json();
    console.log('Weather Data:', weatherData); // Log the response

    // Display current weather if available
    if (weatherData.weather && weatherData.weather.length > 0 && weatherData.main) {
      const currentWeather = document.createElement('p');
      currentWeather.textContent = `Current Weather: ${weatherData.weather[0].description}, ${weatherData.main.temp}°C`;
      weatherInfoDiv.appendChild(currentWeather);
    } else {
      throw new Error('Invalid data received from the weather API');
    }

    // Fetch 5-day forecast
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    // Display daily forecast for the next 5 days with weather icons
    const dailyForecast = document.createElement('div');
    dailyForecast.innerHTML = '<h3>5-Day Forecast:</h3>';
    const dailyData = forecastData.list.filter(entry => entry.dt_txt.includes('12:00:00')); // Retrieve data for 12:00 PM each day
    dailyData.forEach(day => {
      const forecast = document.createElement('div');

      // Display date
      const date = document.createElement('p');
      date.textContent = new Date(day.dt * 1000).toDateString();
      forecast.appendChild(date);

      // Display temperature
      const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${day.main.temp}°C`;
      forecast.appendChild(temperature);

      // Display weather description
      const weatherDesc = document.createElement('p');
      weatherDesc.textContent = `Weather: ${day.weather[0].description}`;
      forecast.appendChild(weatherDesc);

      // Display weather icon based on weather condition code
      const weatherIcon = document.createElement('img');
      const iconCode = day.weather[0].icon; // Icon code provided by OpenWeatherMap API
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`; // Image URL based on icon code
      weatherIcon.alt = day.weather[0].main; // Alt text based on weather status
      forecast.appendChild(weatherIcon);

      dailyForecast.appendChild(forecast);
    });
    weatherInfoDiv.appendChild(dailyForecast);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoDiv.textContent = 'Failed to fetch weather data. Please try again.';
  }
}
