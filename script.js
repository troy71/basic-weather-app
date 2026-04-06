const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search_button");
const weatherIcon = document.querySelector(".weather-icon");
const currentDateTime = document.getElementById("currentDateTime");

function updateDateTime() {
  const now = new Date();
  const dateTimeStr =
    now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " • " +
    now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (currentDateTime) {
    currentDateTime.textContent = dateTimeStr;
  }
}

async function checkWeather(city) {
  try {
    const response = await fetch(`weather.php?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (Number(data.cod) !== 200) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather-display").style.display = "flex";
      return;
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather-display").style.display = "flex";

    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " mph";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".feels").innerHTML =
      Math.round(data.main.feels_like) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".descrip").innerHTML = data.weather[0].description;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    if (document.querySelector(".min")) {
      document.querySelector(".min").innerHTML =
        data.wind.deg !== undefined ? `${data.wind.deg}°` : "N/A";
    }

    const sunrise = new Date(data.sys.sunrise * 1000);
    document.querySelector(".sunrise").innerHTML = sunrise.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    updateDateTime();

    const sunset = new Date(data.sys.sunset * 1000);
    document.querySelector(".sunset").innerHTML = sunset.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );

    document.querySelector(".rain").innerHTML = data.rain
      ? `${data.rain["1h"] || 0} mm`
      : "0 mm";

    document.querySelector(".cloud").innerHTML = data.clouds.all + "%";

    const condition = data.weather[0].main;
    console.log("Weather condition:", condition);

    // 🔹 Weather icon logic
    if (condition === "Clouds") weatherIcon.src = "./images/clouds.png";
    else if (condition === "Clear") weatherIcon.src = "./images/clear.png";
    else if (condition === "Rain") weatherIcon.src = "./images/rain.png";
    else if (condition === "Drizzle") weatherIcon.src = "./images/drizzle.png";
    else if (
      condition === "Mist" ||
      condition === "Haze" ||
      condition === "Smoke"
    )
      weatherIcon.src = "./images/mist.png";
    else if (condition === "Snow") weatherIcon.src = "./images/snow.png";
    else weatherIcon.src = "./images/clouds.png";
  } catch (error) {
    console.log("Error fetching data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-display").style.display = "flex";
  }
}

// 🔹 Load default city on page load
document.addEventListener("DOMContentLoaded", () => {
  // Force hide error message on page load
  const errorElement = document.querySelector(".error");
  if (errorElement) {
    errorElement.style.display = "none";
  }

  // Hide weather display initially until data loads
  const weatherElement = document.querySelector(".weather-display");
  if (weatherElement) {
    weatherElement.style.display = "none";
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  checkWeather("London");
});

// 🔹 Button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();

  if (city.length < 2 || !/^[a-zA-Z\s]+$/.test(city)) {
    document.querySelector(".error").style.display = "block";
    return;
  }

  document.querySelector(".error").style.display = "none";
  checkWeather(city);
});

// 🔹 Enter key support
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// 🔹 Hide error when user starts typing
searchBox.addEventListener("input", () => {
  document.querySelector(".error").style.display = "none";
});

