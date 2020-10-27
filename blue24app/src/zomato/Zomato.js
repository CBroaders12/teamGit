import React, {useState, useEffect} from 'react';
import {Card, CardImg, CardTitle, CardText, Row, Col, CardBody} from 'reactstrap';

let key = '17ceaec91e2193eb22e79047221574d6';



const ZomatoApi = (props) => {

    const [response, setResponse] = useState('');

    const fetchRestaurant = async() => {

         fetch('https://developers.zomato.com/api/v2.1/geocode?lat=39.7684&lon=-86.1581', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'user-key': '17ceaec91e2193eb22e79047221574d6'
            }

        }).then(response => response.json())
        .then(data => {
            setResponse(data);
        })
    }
        
    useEffect(() => {
        fetchRestaurant();

    },[])

    console.log(response);
    return(
        <>
            {response.nearby_restaurants.map(restaurant => {
                return(
                    <Col sm="6" key={restaurant.restaurant.id}>
          <CardBody>
            <CardTitle>{restaurant.restaurant.name}</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <CardImg width="100%" src="/assets/318x180.svg" alt="Card image cap" />
          </CardBody>
        </Col>

                )
            })}
        
    </>
      
    
  
    );
};

export default ZomatoApi;


