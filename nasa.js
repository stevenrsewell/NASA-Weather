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

async function getAPODAndDisplayInfo() {
  const apiKey = 'MI9nDY7iLpbQOgWP6YKO8KK8I2BAxUqX7Om4UFre';
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const infoIcon = document.querySelector('.bx.bxs-info-circle');
  const infoPopup = document.getElementById('infoPopup');

  try {
    const response = await fetch(apodUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const apodData = await response.json();
    console.log('APOD Data:', apodData); // Log the response

    if (apodData.explanation) {
      infoIcon.addEventListener('mouseover', () => {
        infoPopup.textContent = apodData.explanation;
        infoPopup.style.display = 'block';
        infoPopup.style.left = `${infoIcon.getBoundingClientRect().left}px`;
        infoPopup.style.top = `${infoIcon.getBoundingClientRect().bottom}px`;
      });

      infoIcon.addEventListener('mouseout', () => {
        infoPopup.style.display = 'none';
      });
    } else {
      throw new Error('Invalid data received from the NASA APOD API');
    }
  } catch (error) {
    console.error('Error fetching APOD:', error);
    // Handle error if needed
  }
}

// Call the function to fetch APOD data and display popup
getAPODAndDisplayInfo();

