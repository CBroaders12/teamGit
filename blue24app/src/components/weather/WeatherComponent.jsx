import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, CardImg, CardHeader, Button } from 'reactstrap';

const WeatherComponent = props => {

  const myLocation = {
    lat: 39.86,
    long: -86.13,
  };

  const [ latitude, setLatitude ] = useState(myLocation.lat);
  const [ longitude, setLongitude ] = useState(myLocation.long);
  const [ temp, setTemp ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ isImperial, setIsImperial ] = useState(true);
  const [ icon, setIcon ] = useState('');
  const [ unitType, setUnitType ] = useState('imperial');

  const toggleUnitType = () => unitType === "imperial" ? setUnitType("metric") : setUnitType("imperial");

  const toggleTempScale = () => {
    setIsImperial(!isImperial);
    toggleUnitType();
  }

  const apiKey = "a7688b921c49078b59d83b229dee0a22";
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&exclude=minutely,hourly,daily,alerts`

  const fetchWeather = () => {
    fetch(`${weatherURL}&units=${unitType}`)
      .then(response => response.json())
      .then(json => {
        console.log(json.current);
        setTemp(Math.round(json.current.temp));
        setDescription(json.current.weather[0].main);
        setIcon(json.current.weather[0].icon);
      })
  };

  useEffect(fetchWeather, []);

  return(
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-weight-bold">{description}</CardTitle>
      </CardHeader>
      <CardImg src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <CardBody className="text-center">
        <CardSubtitle>Temperature</CardSubtitle>
        {isImperial ? <CardText>{temp} F</CardText> : <CardText>{Math.round((temp - 32 ) / 1.8) } C</CardText>}
        <Button color="success" onClick={toggleTempScale}>Switch C/F</Button>
      </CardBody>
    </Card>
  );
};

export default WeatherComponent;