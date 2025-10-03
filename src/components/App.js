import React, { useState } from "react";
import './../styles/App.css';

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === 200) { // valid response
          setTimeout(() => setWeather(data), 500); // short delay for Cypress
          setError(false);
        } else {
          setWeather(null);
          setError(true);
        }
      })
      .catch(err => {
        console.error(err);
        setWeather(null);
        setError(true);
      });

    setQuery(""); // clear input after search
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
      <div className="weather">
        {weather ? (
          <>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </>
        ) : error ? (
          <p>City not found</p>
        ) : (
          <p>Enter a city to see weather info</p>
        )}
      </div>
    </div>
  );
}

export default App;
