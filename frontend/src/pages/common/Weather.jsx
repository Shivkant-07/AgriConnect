import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        fetchWeather(lat, lon);
        fetchCity(lat, lon);
      },
      (error) => {
        console.log(error);
        alert("Location Permission Denied");
      }
    );
  }, []);

  // Weather API
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Get City Name
  const fetchCity = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      setCity(
        response.data.address.city ||
          response.data.address.town ||
          response.data.address.village ||
          "Unknown Location"
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20 font-bold">
        Loading Weather...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          🌦 Live Weather
        </h1>

        <h2 className="text-2xl font-semibold mb-5">
          📍 {city}
        </h2>

        <div className="text-6xl mb-5">
          ☀️
        </div>

        <h2 className="text-5xl font-bold text-green-700">
          {weather.current.temperature_2m}°C
        </h2>

        <div className="mt-8 space-y-3 text-lg">

          <p>
            💧 Humidity :
            <span className="font-semibold">
              {" "}
              {weather.current.relative_humidity_2m}%
            </span>
          </p>

          <p>
            🌬 Wind Speed :
            <span className="font-semibold">
              {" "}
              {weather.current.wind_speed_10m} km/h
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Weather;