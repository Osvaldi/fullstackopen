import axios from 'axios'


const getWeather = (lat, lng) => {
  const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=weather_code,temperature_2m,wind_speed_10m&timezone=auto`)
  return request.then(response => response.data)
}

export default { getWeather }