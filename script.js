const cityInput = document.querySelector("#city"); 
const btn = document.querySelector("#search");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const humidity = document.querySelector("#humidity");

const API_KEY = "11bbb2fa7d76703e4f321b5d0f3c1873";

async function getWeather(city) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    temp.textContent = `Temp: ${data.main.temp} °C`;
    desc.textContent= data.weather[0].description;
    humidity.textContent =`Humidity: ${data.main.humidity}%`
}

btn.addEventListener("click", ()=>{
    const city = cityInput.value;
    getWeather(city);
})

