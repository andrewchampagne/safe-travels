import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "2551d0104ece484556752a8973366ee5"; 

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch weather.");
      setWeather(null);
    }
  };


return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Weather App</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">{weather.name}</h3>
          <p className="text-4xl">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;