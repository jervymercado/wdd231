// ---------- Weather ----------
// Quezon City coordinates
const LAT = 14.6760;
const LON = 121.0437;
const WEATHER_API_KEY = "cda041eb1fdf3d4e3f4292ef84f5f6cd";

const currentWeatherEl = document.querySelector("#currentWeather");
const forecastEl = document.querySelector("#weatherForecast");

async function loadCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    currentWeatherEl.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" width="60" height="60" />
      <p class="current-temp">${temp}&deg;C</p>
      <p class="current-desc">${description}</p>
    `;
  } catch (error) {
    currentWeatherEl.innerHTML = `<p role="alert">Weather is currently unavailable.</p>`;
    console.error("Error fetching current weather:", error);
  }
}

async function loadForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Forecast request failed (${response.status})`);
    const data = await response.json();

    // The 5-day/3-hour forecast returns 8 entries per day.
    // Pick the entry closest to 12:00 for each of the next 3 days.
    const daily = data.list.filter((entry) => entry.dt_txt.includes("12:00:00")).slice(0, 3);

    forecastEl.innerHTML = daily
      .map((entry) => {
        const date = new Date(entry.dt_txt);
        const label = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(entry.main.temp);
        return `
          <div class="forecast-day">
            <p class="forecast-label">${label}</p>
            <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].description}" width="40" height="40" />
            <p class="forecast-temp">${temp}&deg;C</p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    forecastEl.innerHTML = `<p role="alert">3-day forecast is currently unavailable.</p>`;
    console.error("Error fetching forecast:", error);
  }
}

loadCurrentWeather();
loadForecast();

// ---------- Member spotlights ----------
const spotlightGrid = document.querySelector("#spotlightGrid");
const tierNames = { 2: "Silver", 3: "Gold" };

function spotlightTemplate(member) {
  return `
    <article class="spotlight-card" data-tier="${member.membership}">
      <img src="images/${member.image}" alt="${member.name} logo" width="64" height="64" loading="lazy" />
      <h3>${member.name}</h3>
      <span class="member-tier">${tierNames[member.membership]}</span>
      <address>
        ${member.address}<br />
        ${member.phone}
      </address>
      <a class="visit" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    </article>
  `;
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
    const data = await response.json();

    // Only silver (2) and gold (3) members qualify for a spotlight
    const eligible = data.members.filter((member) => member.membership === 2 || member.membership === 3);

    // Shuffle and take 3 (or fewer if not enough eligible members)
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 3);

    spotlightGrid.innerHTML = chosen.map(spotlightTemplate).join("");
  } catch (error) {
    spotlightGrid.innerHTML = `<p role="alert">Member spotlights could not be loaded right now.</p>`;
    console.error("Error fetching spotlight data:", error);
  }
}

loadSpotlights();
