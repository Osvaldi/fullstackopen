import React, { useState, useEffect } from 'react'
import axios from 'axios'

import countriesService from './services/countries'
import weatherService from './services/weather'
import './index.css'

const Country = ({ country, onShow }) => {
  return (
    <p>{country.name.common} <button onClick={() => onShow(country)}>Show</button></p>
  )
}

const CountryDetails = ({ country, weather }) => {
  const languages = Object.values(country.languages)
  const flag = country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flag} width={160} />
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.current.temperature_2m} °C</p>
          <img src={`http://openweathermap.org/img/wn/${String(weather.current.weather_code ?? '').padStart(2, '0')}n@2x.png`} />
          <p>Wind: {weather.current.wind_speed_10m} m/s</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

const Search = ({ search, onChange }) => (
  <div>
    find countries <input value={search} onChange={onChange} />
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const hook = () => {
    countriesService.getAllCountries().then(initialCountries => {
      setCountries(initialCountries)
    })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const filteredCountries = countries.filter(c =>
    (c.name.common).toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const countryToShow = selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0] : null)
    if (!countryToShow) {
      setWeather(null)
      return
    }
    const coords = countryToShow.capitalInfo.latlng
    if (Array.isArray(coords) && coords.length === 2) {
      const [lat, lng] = coords
      weatherService.getWeather(lat, lng).then(setWeather).catch(() => setWeather(null))
    } else {
      setWeather(null)
    }
  }, [selectedCountry, filteredCountries])

  return (
    <div>
      <Search search={search} onChange={handleSearch} />

      <div>
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} weather={weather} />
        ) : (
          <>
            {filteredCountries.length > 10 && (
              <p>Too many matches, specify another filter</p>
            )}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
              filteredCountries.map(country => (
                <Country key={country.name.common} country={country} onShow={setSelectedCountry} />
              ))
            )}
            {filteredCountries.length === 1 && (
              <CountryDetails country={filteredCountries[0]} weather={weather} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App