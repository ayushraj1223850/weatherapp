import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const Highlightbox = ({ title, value, unit, sunrise, sunset, airQuality, isMobile }) => {
  const getAirQualityLabel = (aqi) => {
    switch(aqi) {
      case 1: return { text: 'Good', color: '#4CAF50' };
      case 2: return { text: 'Fair', color: '#8BC34A' };
      case 3: return { text: 'Moderate', color: '#FFC107' };
      case 4: return { text: 'Poor', color: '#FF9800' };
      case 5: return { text: 'Very Poor', color: '#F44336' };
      default: return { text: 'Unknown', color: '#9E9E9E' };
    }
  };

  return (
    <div className="card" style={{ 
      borderRadius: "10px", 
      padding: "15px", 
      display: "flex", 
      flexDirection: isMobile ? "row" : "column",
      alignItems: "center",
      justifyContent: isMobile ? "space-between" : "center",
      height: isMobile ? "auto" : "130px",
      minHeight: "80px"
    }}>
      <h3 style={{ 
        marginBottom: isMobile ? "0" : "10px", 
        fontSize: "16px", 
        fontWeight: "500",
        color: "var(--text-color)",
        width: isMobile ? "30%" : "auto",
        textAlign: isMobile ? "left" : "center"
      }}>
        {title}
      </h3>
      
      {sunrise && sunset ? (
        <div style={{ 
          display: "flex", 
          justifyContent: isMobile ? "flex-end" : "space-around", 
          width: isMobile ? "70%" : "100%",
          marginTop: isMobile ? "0" : "10px"
        }}>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "row" : "column", 
            alignItems: "center",
            marginRight: isMobile ? "15px" : "0"
          }}>
            <WbSunnyIcon style={{ 
              color: "#FFC107", 
              fontSize: isMobile ? "24px" : "30px", 
              marginBottom: isMobile ? "0" : "5px",
              marginRight: isMobile ? "5px" : "0"
            }} />
            <p style={{ color: "var(--text-color)" }}>{sunrise}</p>
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "row" : "column", 
            alignItems: "center" 
          }}>
            <NightsStayIcon style={{ 
              color: "#3F51B5", 
              fontSize: isMobile ? "24px" : "30px", 
              marginBottom: isMobile ? "0" : "5px",
              marginRight: isMobile ? "5px" : "0"
            }} />
            <p style={{ color: "var(--text-color)" }}>{sunset}</p>
          </div>
        </div>
      ) : airQuality ? (
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "row" : "column", 
          alignItems: isMobile ? "center" : "center",
          justifyContent: isMobile ? "flex-end" : "center",
          marginTop: isMobile ? "0" : "10px",
          width: isMobile ? "70%" : "auto"
        }}>
          <div style={{ 
            backgroundColor: getAirQualityLabel(value).color,
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: isMobile ? "0" : "10px",
            marginRight: isMobile ? "10px" : "0"
          }}>
            {getAirQualityLabel(value).text}
          </div>
          <p style={{ 
            fontSize: isMobile ? "20px" : "24px", 
            fontWeight: "bold",
            color: "var(--text-color)"
          }}>
            {value}
          </p>
        </div>
      ) : (
        <div style={{ 
          display: "flex", 
          alignItems: "baseline", 
          marginTop: isMobile ? "0" : "10px",
          width: isMobile ? "70%" : "auto",
          justifyContent: isMobile ? "flex-end" : "center"
        }}>
          <p style={{ 
            fontSize: isMobile ? "24px" : "28px", 
            fontWeight: "bold",
            color: "var(--text-color)"
          }}>
            {value}
          </p>
          <span style={{ 
            marginLeft: "5px", 
            fontSize: "16px",
            color: "var(--text-color)"
          }}>
            {unit}
          </span>
        </div>
      )}
    </div>
  );
};

export default Highlightbox;
