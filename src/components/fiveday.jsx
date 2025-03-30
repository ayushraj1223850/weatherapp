import React, { useState, useEffect } from "react";

const FiveDayForecast = ({ forecastData }) => {
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

  // Process the data to get one forecast per day (at midday)
  const dailyForecasts = [];
  const processedDates = new Set();

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    // Only take the first forecast for each day
    if (!processedDates.has(date)) {
      processedDates.add(date);
      dailyForecasts.push(item);
      
      // Stop once we have 5 days
      if (dailyForecasts.length >= 5) {
        return;
      }
    }
  });

  return (
    <div className="card" style={{
      borderRadius: "16px",
      padding: isMobile ? "15px" : "20px",
      marginTop: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "10px",
      flexDirection: isMobile ? "column" : "row"
    }}>
      {dailyForecasts.map((forecast, index) => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

        return (
          <div key={index} style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "center",
            flex: isMobile ? "none" : "1",
            minWidth: isMobile ? "100%" : "100px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "var(--card-bg)",
            boxShadow: isMobile ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: isMobile ? "flex-start" : "center",
              width: isMobile ? "30%" : "auto"
            }}>
              <p style={{ fontWeight: "bold", marginBottom: "5px", color: "var(--text-color)" }}>{dayName}</p>
              <p style={{ fontSize: "13px", marginBottom: isMobile ? "0" : "10px", color: "var(--text-color)" }}>{dayDate}</p>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isMobile ? "40%" : "auto"
            }}>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "flex-end" : "center",
              width: isMobile ? "30%" : "auto"
            }}>
              <p style={{ fontWeight: "bold", marginTop: isMobile ? "0" : "5px", color: "var(--text-color)" }}>
                {Math.round(forecast.main.temp)}°C
              </p>
              <p style={{ 
                fontSize: "12px", 
                textAlign: isMobile ? "right" : "center", 
                color: "var(--text-color)",
                display: isMobile ? "none" : "block"
              }}>
                {forecast.weather[0].description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FiveDayForecast;
