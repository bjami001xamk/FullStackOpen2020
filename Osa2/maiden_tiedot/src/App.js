import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [ newCountry, setNewCountry ] = useState("")
  const [ allCountries, setAllCountries] = useState("")

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  useEffect (() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  return (
    <div>
      find countries <input value={newCountry} onChange={handleCountryChange}/><br/>
      <Content newCountry={newCountry} allCountries={allCountries} setNewCountry={setNewCountry} />
  
    </div>
  );
}

const Content = ({newCountry, allCountries, setNewCountry}) => {
  if(allCountries.length === 0) {
    return(<>Too many matches, specify another filter</>)
  }
  let filteredCountries = allCountries.filter(country => 
    country.name.includes(newCountry)
  )
  if(filteredCountries.length > 10) {
    return(<>Too many matches, specify another filter</>)
  }
  if(filteredCountries.length === 1) {
    let url = 'http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + filteredCountries[0].capital
    return(
      <Details url={url} filteredCountries={filteredCountries}/>
    )
  }

  return (
    <>
      {filteredCountries.map(country => 
        <div key={country.name}>{country.name} <button onClick={() => setNewCountry(country.name)}>Show</button><br/></div>
      )}
    </>
  )
}

const Details = ({url, filteredCountries}) => {
  const [ temp, setTemp] = useState("")
  const [ imgUrl, setImgUrl] = useState("")
  useEffect (() => {
      axios
        .get(url)
        .then(response => {
          setTemp(response.data.current)
          setImgUrl(response.data.current.weather_icons[0])
        })
    }, [])
  return (
    <div>
      <h2>{filteredCountries[0].name}</h2>
      capital {filteredCountries[0].capital}<br/>
      population {filteredCountries[0].population}
      <h3>languages</h3>
      <ul>
        {filteredCountries[0].languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src = {filteredCountries[0].flag}></img>
      <h3>Weaher In {filteredCountries[0].capital}</h3>
      temperature: {temp.temperature} Celsius
      <br/><img src={imgUrl}></img><br/>
      wind: {temp.wind_speed} mph direction {temp.wind_dir}
    </div>
  )
}
export default App;
