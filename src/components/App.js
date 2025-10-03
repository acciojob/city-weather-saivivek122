
import React, { useState } from "react";
import './../styles/App.css';

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = (e) => {
  e.preventDefault();
  if (!query) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      setWeather(data);
    })
    .catch(err => {
      console.error(err);
      setWeather(null);
    });

  setQuery("");
};

  return (
    <div>
      {/* Search input */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="search"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Weather display */}
      {weather && weather.main ? (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : null}
    </div>
  );
}
export default App
