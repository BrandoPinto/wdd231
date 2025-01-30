import { fahrenheitToCelsius, mphToKmh, runWindChill } from "./windchill.js";

const temperature = document.querySelector("#temperature");
const weatherPicture = document.querySelector("#weather-picture");
const windSpeed = document.querySelector("#windSpeed")
const weatherDesc = document.querySelector("#weather-description");

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Arequipa,PE&appid=54da382318799586745f2112ab1d86ec&units=metric';

if (temperature != null) {
    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    } 

    function displayResults(weatherData) {
        try {
            temperature.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)}</strong>`;
        } catch (error) {
            console.error('Error setting temperature:', error);
        }
        
        const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const desc = weatherData.weather[0].description.toUpperCase();

        try {
            weatherPicture.setAttribute('src', iconsrc);
            weatherPicture.setAttribute('alt', `Logo for ${desc}`);
            weatherDesc.textContent = desc;
            windSpeed.innerHTML = `${(weatherData.wind.speed * 3.6).toFixed(1)}`; // Convert m/s to km/h
        } catch (error) {
            console.error('Error setting weather information:', error);
        }

        runWindChill();
    }

    apiFetch();
};
