import React, {useState} from 'react';
const baseURL = 'https://api.nasa.gov/planetary/earth/assets';
const APIkey = '&api_key=gLXgS0oyJ9sppHJQrvddifM7GmIXCHajGiwb6Nu8'; 
const date = '&date=2020-10-26';
const lat = '&lat=39.791000';
const lon = '?lon=-86.148003';

console.log('hello');

const NasaComponent = (props) => {
  const [results, setResults] = useState('');

  fetch(baseURL+lon+lat+date+APIkey)
  .then(response => response.json())
  .then(json => setResults(json.url));
  ;

  return (
    <div>
      <img className="satImg" src={results} />
      {/* <p>The Longitude is: {props.latitude}</p>
      <p>The Longitude is: {props.longitude}</p> */}
    </div>
  )
}

export default NasaComponent

