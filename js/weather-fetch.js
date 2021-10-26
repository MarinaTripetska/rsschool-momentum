import refs from './refs.js';
const { weatherError, weatherIcon, temperature, weatherDescription, cityInput, wind: windEl, humidity } = refs;

let lang = 'en';
let city = 'Minsk';


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', () => {
  const elems = document.querySelectorAll('.play-item');
  elems[0].classList.add('item-active')
  getLocalStorage();
  getWeather(lang, city);
 }
);



cityInput.addEventListener('change', (e) => {
  const value = e.target.value.trim()
weatherIcon.className = 'weather-icon owf';
 
  temperature.textContent = ``;
    weatherDescription.textContent = '';
    windEl.textContent = ``;
  humidity.textContent = '';

  if (value === '') {
      weatherError.textContent = 'Enter the city you need, for see the weather.'
  } else {
    weatherError.textContent = '';
    getWeather(lang, value);
  }
   
} )



async function getWeather(lang, city) {
    const MAIN_PATH = 'https://api.openweathermap.org/data/2.5/weather';
    const MY_KEY = 'e11798a596ae7b2a0ecc8e342555f642';
  const url = `${MAIN_PATH}?q=${city}&lang=${lang}&appid=${MY_KEY}&units=metric`;
try {
 const res = await fetch(url);
   
     const data = await res.json();
  // console.log(data);
 


    const {weather, main, wind} = data;
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${weather[0].id}`);
    temperature.textContent = `${Math.round(main.temp)}°C`;
    weatherDescription.textContent = weather[0].description;
    windEl.textContent = `Wind speed: ${Math.round(wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(main.humidity)}%` 
 
  
} catch (error) {
  weatherError.textContent = 'Please, provide correct name'
  
  setTimeout(() => {
     cityInput.value = ''
  }, 1000)
}  
}


function setLocalStorage() {
  const cityValue = cityInput.value.trim();
  console.log(cityValue);
  if (cityValue !== '') {
    localStorage.setItem('city', cityValue);  
  } else {
    localStorage.removeItem('city');
  }
  
}
function getLocalStorage() {
     if (localStorage.getItem('city')) {
         cityInput.value = localStorage.getItem('city')
         city = localStorage.getItem('city')
     } else {
         cityInput.value = city
    }

}