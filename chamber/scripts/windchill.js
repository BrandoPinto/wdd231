
// GET TEMPERATURE AND WINDSPEED ELEMENTS
export function runWindChill() {
  const temperatureC = parseFloat(document.querySelector("#temperature").textContent);
  const windSpeedKmh = parseFloat(document.querySelector("#windSpeed").textContent);

if (temperatureC <= 10 && windSpeedKmh > 4.8) {
  const temperatureF = celsiusToFahrenheit(temperatureC);
  const windSpeedMph = kmhToMph(windSpeedKmh);

  const windChill = calculateWindChill(temperatureF,windSpeedMph);
  document.querySelector("#windChill").textContent = `${fahrenheitToCelsius(windChill).toFixed(1)} °C`;
}
else {
  document.querySelector("#windChill").textContent = "N/A";
}
}


function celsiusToFahrenheit(temperatureC) {
  
  return (temperatureC * 9 / 5) + 32;
}


export function fahrenheitToCelsius(temperatureF) {
  return (temperatureF - 32) * 5 / 9;
}


function kmhToMph(speedKmh) {
  return speedKmh / 1.60934;
}


export function mphToKmh(speedMph) {
  return speedMph * 1.60934 
}

function calculateWindChill(temperatureF, windSpeedMph) {
  const windChill = 35.74 + 0.6215 * temperatureF - 35.75 * Math.pow(windSpeedMph,0.16) + 0.4275 * temperatureF * Math.pow(windSpeedMph, 0.16);
  return windChill;
}