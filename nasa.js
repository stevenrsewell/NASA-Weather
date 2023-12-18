async function getAPOD() {
    const apiKey = 'MI9nDY7iLpbQOgWP6YKO8KK8I2BAxUqX7Om4UFre';
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
    try {
      const response = await fetch(apodUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const apodData = await response.json();
      console.log('APOD Data:', apodData); // Log the response
  
      if (apodData.url) {
        document.body.style.backgroundImage = `url(${apodData.url})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
      } else {
        throw new Error('Invalid data received from the NASA APOD API');
      }
    } catch (error) {
      console.error('Error fetching APOD:', error);
      // Handle error if needed
    }
  }
  
  // Call the function to set the background image on page load
  getAPOD();
  