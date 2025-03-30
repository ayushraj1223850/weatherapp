import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import { useTheme } from "./context/ThemeContext";
import axios from "axios";

const WeatherDashboard = () => {
  const { darkMode } = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Default city is set to London
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '50dd64c74d5107462ae9aa7f07ee0747'; // Replace with your OpenWeatherMap API key
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = '50dd64c74d5107462ae9aa7f07ee0747'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        fetchAirQualityData(data.coord.lat, data.coord.lon); 
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => {
          setFiveDayForecast(response.data);
        })
        .catch(error => console.error('Error fetching the 5-day forecast data:', error));
    
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity); 
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData &&  (
        <div style={{ 
          display: "flex", 
          padding: "20px", 
          gap: "20px",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <div style={{ 
            flex: isMobile ? "auto" : "1", 
            width: "100%",
            marginRight: isMobile ? "0" : "10px" 
          }}>
            <MainWeatherCard weatherData={weatherData} />
            <p style={{ 
              fontWeight: "700", 
              fontSize: "20px", 
              marginTop: "20px", 
              color: "var(--text-color)" 
            }}>
              5 Days Forecast
            </p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            flex: isMobile ? "auto" : "0.5",
            width: "100%", 
            gap: "20px" 
          }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
