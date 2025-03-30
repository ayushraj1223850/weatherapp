import React, { useState, useEffect } from 'react';
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Highlightbox from "./Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const TodayHighlights = ({ weatherData, airQualityData }) => {
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

  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi; // Accessing aqi from airQualityData.main
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      Icon: CompressIcon,
    },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      Icon:  VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="card" style={{ 
      borderRadius: "16px", 
      padding: isMobile ? "15px" : "20px", 
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{ 
        marginBottom: "15px", 
        fontSize: isMobile ? "18px" : "20px", 
        fontWeight: "700", 
        color: "var(--text-color)",
        textAlign: isMobile ? "center" : "left"
      }}>
        Today's Highlights
      </h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
        gap: "15px" 
      }}>
        <Highlightbox 
          title="UV Index" 
          value={weatherData.uvi || "N/A"} 
          unit="" 
          isMobile={isMobile}
        />
        
        <Highlightbox 
          title="Wind Status" 
          value={Math.round(weatherData.wind.speed)} 
          unit="m/s" 
          isMobile={isMobile}
        />
        
        <Highlightbox 
          title="Sunrise & Sunset" 
          sunrise={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
          sunset={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
          isMobile={isMobile}
        />
        
        <Highlightbox 
          title="Humidity" 
          value={weatherData.main.humidity} 
          unit="%" 
          isMobile={isMobile}
        />
        
        <Highlightbox 
          title="Visibility" 
          value={(weatherData.visibility / 1000).toFixed(1)} 
          unit="km" 
          isMobile={isMobile}
        />
        
        <Highlightbox 
          title="Air Quality" 
          value={airQualityData.main.aqi} 
          airQuality={true} 
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default TodayHighlights;
