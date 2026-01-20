import React, { useState, useEffect } from 'react'
import axios from 'axios'

import countriesService from './services/countries'
import './index.css'

const Country = ({ country, onShow }) => {
  return (
    <p>{country.name.common} <button onClick={() => onShow(country)}>Show</button></p>
  )
}

const CountryDetails = ({ country }) => {
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

  const hook = () => {
    console.log('effect')
    countriesService.getAllCountries().then(initialCountries => {
      console.log('promise fulfilled')
      setCountries(initialCountries)
    })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(c =>
    (c.name.common).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Search search={search} onChange={handleSearch} />

      <div>
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} />
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
              <CountryDetails country={filteredCountries[0]} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App