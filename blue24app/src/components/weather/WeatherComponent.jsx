import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  Button,
  Row,
  Col
} from 'reactstrap';

const WeatherComponent = props => {

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
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.latitude}&lon=${props.longitude}&appid=${apiKey}&exclude=minutely,hourly,daily,alerts`

  const fetchWeather = () => {
    fetch(`${weatherURL}&units=${unitType}`)
      .then(response => response.json())
      .then(json => {
        setTemp(Math.round(json.current.temp));
        setDescription(json.current.weather[0].main);
        setIcon(json.current.weather[0].icon);
      })
  };

  useEffect(fetchWeather, []);

  return(
    <Card>
      <CardHeader color="primary">
        <CardTitle className="text-center font-weight-bold">{description}</CardTitle>
      </CardHeader>
      <Row>
        <Col md="6">
        <img width="100%" className="mx-auto" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description}/>
        </Col>
        <Col md="6">
          <CardBody className="text-center">
            { isImperial
            ? <CardText className="font-weight-bold">{temp} &deg;F</CardText>   
            : <CardText className="font-weight-bold">{Math.round((temp - 32 ) / 1.8) } &deg;C</CardText>
            }
          </CardBody>
        </Col>
      </Row>
      { isImperial
      ? <Button color="primary" onClick={toggleTempScale}>Switch to &deg;C</Button>
      : <Button color="primary" onClick={toggleTempScale}>Switch to &deg;F</Button>
      }
    </Card>
  );
};

export default WeatherComponent;