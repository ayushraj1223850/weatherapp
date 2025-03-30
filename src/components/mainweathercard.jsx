import React, { useState, useEffect } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Hot weather icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Cold weather icon
import CloudIcon from '@mui/icons-material/Cloud'; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {
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

  // Get the current time in the city
  const timestamp = weatherData.dt;
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'orange' }} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'blue' }} />;
    } else {
      return <CloudIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'gray' }} />;
    }
  };

  return (
    <div className="card" style={{
      borderRadius: "16px",
      padding: isMobile ? "15px" : "20px",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s"
    }}>
      <h2 style={{ 
        marginBottom: "20px", 
        fontSize: isMobile ? "20px" : "24px", 
        fontWeight: "bold", 
        color: "var(--text-color)",
        textAlign: "center"
      }}>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <div style={{ textAlign: "center", width: "100%" }}>
        <p style={{ 
          fontSize: isMobile ? "16px" : "18px", 
          marginBottom: "5px", 
          color: "var(--text-color)" 
        }}>
          {day}, {time}
        </p>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row"
        }}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ 
              fontSize: isMobile ? "36px" : "40px", 
              fontWeight: "bold", 
              margin: "10px 0", 
              color: "var(--text-color)" 
            }}>
              {Math.round(weatherData.main.temp)}°C
            </h1>
            <p style={{ 
              fontSize: isMobile ? "16px" : "18px", 
              textTransform: "capitalize", 
              color: "var(--text-color)" 
            }}>
              {weatherData.weather[0].description}
            </p>
          </div>
        </div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          width: "100%", 
          marginTop: "20px",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "10px" : "0"
        }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontSize: "14px", color: "var(--text-color)" }}>Feels Like</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-color)" }}>
              {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontSize: "14px", color: "var(--text-color)" }}>Min</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-color)" }}>
              {Math.round(weatherData.main.temp_min)}°C
            </p>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontSize: "14px", color: "var(--text-color)" }}>Max</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-color)" }}>
              {Math.round(weatherData.main.temp_max)}°C
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1rem', textAlign: isMobile ? "center" : "left", width: "100%" }}>
        <div style={{display:'flex', alignItems:'center', justifyContent: isMobile ? "center" : "flex-start"}}>
          <CalendarMonthIcon/> 
          {currentDate}
        </div>
        <div style={{
          marginTop:'4px', 
          display:'flex', 
          alignItems:'center', 
          justifyContent: isMobile ? "center" : "flex-start"
        }}>
          <LocationOnIcon/>
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
  