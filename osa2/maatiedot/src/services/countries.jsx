import axios from 'axios'
const AllCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const oneCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAllCountries = () => {
  const request = axios.get(AllCountriesUrl)
  return request.then(response => response.data)
}

const getOneCountry = (name) => {
  const request = axios.get(`${oneCountryUrl}/${name}`)
  return request.then(response => response.data)
}

export default { getAllCountries, getOneCountry }