import React, { useState, useEffect } from 'react';

const WeatherComponent = props => {

  const myLocation = {
    lat: 39.86,
    long: -86.13,
  };

  const [ latitude, setLatitude ] = useState(myLocation.lat);
  const [ longitude, setLongitude ] = useState(myLocation.long);
  const [ currentWeather, setCurrentWeather ] = useState({});

  const apiKey = "a7688b921c49078b59d83b229dee0a22";
  // const weatherURL = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&exclude=minutely,hourly,daily,alerts&units=imperial`

  const fetchWeather = () => {
    fetch(weatherURL)
      .then(response => response.json())
      .then(json => {
        console.log(json.current);
        setCurrentWeather(json.current)
      })
  };

  // useEffect(fetchWeather, []);

  return(
    <>
    <div>
      <h1>Weather</h1>
      <button onClick={fetchWeather}>Log weather</button>
    </div>
    </>
  );
};

export default WeatherComponent;