import React, {useEffect, useState} from 'react';
import { Row, Col, Container } from 'reactstrap'

import './App.css';
import WeatherComponent from './components/weather/WeatherComponent'
import ZomatoApi from './zomato/Zomato';

function App() {

  // Default to Indianapolis if browser does not support geolocation
  const [ latitude, setLatitude ] = useState(39.86);    
  const [ longitude, setLongitude ] = useState(-86.13);

  const getCoordinates = position => {
    setLatitude(Math.round(position.coords.latitude * 100) / 100);    //Round to 2 Decimal places
    setLongitude(Math.round(position.coords.longitude * 100) / 100);
  };

  useEffect(() => navigator.geolocation.getCurrentPosition(getCoordinates, console.log), [])

  return (
    <Container fluid="md">
      <Row>
        <Col md="8">
        </Col>
        <Col md="4">
          <WeatherComponent latitude={latitude} longitude={longitude}/>
        </Col>
      </Row>
      <ZomatoApi/>
    </Container>
  );
}

export default App;
