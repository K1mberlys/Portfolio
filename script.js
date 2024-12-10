function downloadCV() {
    window.location.href = "CV_Kimberly.pdf";
  }

  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    if (!name || !email || !message) {
      alert("Vänligen fyll i alla fält.");
    } else {
      alert("Ditt meddelande har skickats, tack för att du kontaktar mig!");
      this.reset();
    }
  });

  function getWeather() {
    const apiKey = "1c38cda01a7ad46d920d05b535785ccb";
    const city = document.getElementById('stad').value;
  
    if (!city) {
      alert("Vänligen ange en stad");
      return;
    }
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    console.log(`Hämtar väderdata för ${city}...`);
  
    fetch(currentWeatherUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Väderdata mottaget:", data);
        displayWeather(data); 
      })
      .catch(error => {
        console.error("Fel vid hämtning av väderdata", error);
        alert("Fel vid hämtning av väderdata, vänligen försök igen.");
      });
  }
  
  function displayWeather(data) {
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
  
    weatherInfoDiv.innerHTML = "";
    tempDivInfo.innerHTML = "";
  
    if (data.cod === "404") {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp); 
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
      const weatherTime = new Date(data.dt * 1000); 
      const formattedTime = weatherTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      const temperatureHTML = `<p>${temperature}ºC</p>`;
      const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        <p>Senast uppdaterad: ${formattedTime}</p>
      `;
  
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
  
      showImage();
    }
  }
  
  function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
  }
  
  document.getElementById("weatherButton").addEventListener("click", getWeather);
  