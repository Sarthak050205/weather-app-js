const cityInput = document.querySelector("#city"); 
const btn = document.querySelector("#search");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const humidity = document.querySelector("#humidity");
const wind = document.getElementById("wind");


const API_KEY = "11bbb2fa7d76703e4f321b5d0f3c1873";

async function getWeather(city) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    temp.textContent = `Temp: ${data.main.temp} °C`;
    desc.textContent= data.weather[0].description;
    humidity.textContent =`Humidity: ${data.main.humidity}%`
    wind.textContent = `Wind: ${data.wind.speed} m/s`;

}

btn.addEventListener("click", () => {
    const city = cityInput.value;
    getWeather(city);
    getForecast(city);
});


async function getForecast(city){

    const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";

    const today = new Date().getDate();
    let count = 0;

    for(let i = 0; i < data.list.length; i++){

        const item = data.list[i];
        const date = new Date(item.dt_txt);

        // Only take forecast around 12:00 PM
        if(date.getHours() === 12 && date.getDate() !== today){

            const day = date.toLocaleDateString("en-US", { weekday: "short" });

            const div = document.createElement("div");
            div.classList.add("forecast-item");

            div.innerHTML = `
                <p><strong>${day}</strong></p>
                <p>${item.main.temp} °C</p>
                <p>${item.weather[0].main}</p>
            `;

            forecastContainer.appendChild(div);

            count++;
            if(count === 5) break;
        }
    }
}


