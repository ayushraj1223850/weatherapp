import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from '@mui/icons-material/FilterDramaTwoTone';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");
  const { darkMode, toggleTheme } = useTheme();
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

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <nav
      className="nav-container"
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        padding: "15px",
        paddingLeft: isMobile ? '15px' : '30px',
        paddingRight: isMobile ? '15px' : '30px',
        gap: isMobile ? "15px" : "0"
      }}
    >
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "2px",
        marginBottom: isMobile ? "10px" : "0",
        justifyContent: isMobile ? "center" : "flex-start",
        width: isMobile ? "100%" : "auto"
      }}>
        <FilterDramaTwoToneIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather</p>
        {isMobile && (
          <IconButton 
            onClick={toggleTheme} 
            className="theme-toggle-button"
            style={{ marginLeft: '10px' }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        )}
      </div>
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "8px",
        width: isMobile ? "100%" : "auto",
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: isMobile ? "center" : "flex-start",
      }}>
        <TextField
          variant="outlined"
          placeholder="Search city 'London'"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "var(--card-bg)",
            borderRadius: "2rem",
            width: isMobile ? "100%" : "22rem",
            marginBottom: isMobile ? "8px" : "0"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ 
            borderRadius: "6px", 
            backgroundColor: 'var(--button-bg)', 
            color: 'var(--button-text)',
            width: isMobile ? "100%" : "auto"
          }}
        >
          Search
        </Button>
        {!isMobile && (
          <IconButton 
            onClick={toggleTheme} 
            className="theme-toggle-button"
            style={{ marginLeft: '10px' }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        )}
      </div>
      
      <div style={{ 
        fontSize: "16px",
        fontWeight: "700",
        backgroundColor: 'var(--button-bg)',
        height: "35px",
        width: isMobile ? "100%" : "150px",
        color: 'var(--button-text)',
        gap:'2px',
        borderRadius: "6px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: isMobile ? "5px" : "0"
      }}>
        <GpsFixedIcon />
        <p style={{
                  fontSize:
                  '14px'
                }}>Current Location</p>
      </div>
    </nav>
  );
};

export default Navbar;
