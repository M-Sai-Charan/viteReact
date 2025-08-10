import React, { useState, useEffect } from 'react';
import './Weather.css';

interface WeatherCondition {
  text: string;
  icon: string;
}

interface AirQuality {
  'us-epa-index': number;
  pm2_5: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

interface CurrentWeather {
  temp_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  last_updated: string;
  air_quality?: AirQuality;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: WeatherCondition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: CurrentWeather;
  forecast: Forecast;
}

const API_KEY = 'cc41c556fbbb4e08aba141018251008';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reverse geocode lat/lon to city name using WeatherAPI search endpoint
  const fetchCityName = async (lat: number, lon: number): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${lat},${lon}`
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0].name;
      }
    } catch {
      // fail silently
    }
    return null;
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        cityName
      )}&days=7&aqi=yes&alerts=yes`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error?.message || 'Error fetching weather');
        setWeather(null);
      }
    } catch {
      setError('Network error, please try again');
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const cityName = await fetchCityName(pos.coords.latitude, pos.coords.longitude);
          if (cityName) {
            setCity(cityName);
            fetchWeather(cityName);
          } else {
            fetchWeather(city); // fallback
          }
        },
        () => {
          fetchWeather(city); // user denied geolocation
        }
      );
    } else {
      fetchWeather(city); // geolocation not supported
    }
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <h1 className="title">Weather Dashboard</h1>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          aria-label="City name"
          className="input"
        />
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>

      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="status-message error">{error}</p>}

      {weather && (
        <div className="weather-results">
          <div className="current-weather">
            <h2>
              {weather.location.name}, {weather.location.region}, {weather.location.country}
            </h2>
            <p className="local-time">Local Time: {weather.location.localtime}</p>

            <div className="current-main">
              <img
                src={
                  weather.current.condition.icon.startsWith('http')
                    ? weather.current.condition.icon
                    : 'https:' + weather.current.condition.icon
                }
                alt={weather.current.condition.text}
                className="weather-icon"
              />
              <div className="temp">
                {Math.round(weather.current.temp_c)}°C
                <div className="feels-like">Feels like {Math.round(weather.current.feelslike_c)}°C</div>
              </div>
            </div>

            <p className="condition">{weather.current.condition.text}</p>

            <div className="extra-info">
              <div>Humidity: {weather.current.humidity}%</div>
              <div>Wind: {weather.current.wind_kph} kph</div>
            </div>

            <div className="extra-info">
              <div>Sunrise: {weather.forecast.forecastday[0].astro.sunrise}</div>
              <div>Sunset: {weather.forecast.forecastday[0].astro.sunset}</div>
            </div>

            {weather.current.air_quality && (
              <div className="extra-info air-quality">
                <div>Air Quality Index: {weather.current.air_quality['us-epa-index']}</div>
                <div>PM2.5: {weather.current.air_quality.pm2_5.toFixed(1)}</div>
                <div>O₃: {weather.current.air_quality.o3.toFixed(1)}</div>
              </div>
            )}
          </div>

          <div className="forecast">
            <h3>7-Day Forecast</h3>
            <div className="forecast-grid">
              {weather.forecast.forecastday.map((day) => (
                <div className="forecast-day" key={day.date}>
                  <p className="date">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <img
                    src={
                      day.day.condition.icon.startsWith('http')
                        ? day.day.condition.icon
                        : 'https:' + day.day.condition.icon
                    }
                    alt={day.day.condition.text}
                    className="forecast-icon"
                  />
                  <p className="condition">{day.day.condition.text}</p>
                  <p className="temp-range">
                    {Math.round(day.day.mintemp_c)}°C / {Math.round(day.day.maxtemp_c)}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
