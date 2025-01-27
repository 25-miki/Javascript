async function fetchCities() {
    const url = "http://www.alpati.net/DWEC/cities/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error al obtener la lista de ciudades");
        }
        const cities = await response.json();
        const spanishCities = cities.filter(city => city[5] === "ES");
        console.log(spanishCities);
        return spanishCities;
    } 
    catch (error) {
        console.error("Error:", error);
    }
}

async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error al obtener los datos meteorológicos");
        }
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.error("Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const citySelect = document.getElementById("city-select");
    const weatherInfo = document.getElementById("weather-info");

    const cities = await fetchCities();
    if (cities) {
        citySelect.innerHTML = cities
            .map(city => `<option value="${city[3]},${city[4]}">${city[1]}</option>`)
            .join("");
    }

    citySelect.addEventListener("change", async (event) => {
        const [lat, lon] = event.target.value.split(",");
        if (lat && lon) {
            const weatherData = await fetchWeather(lat, lon);
            if (weatherData && weatherData.daily) {
                const { daily } = weatherData;
                weatherInfo.innerHTML = `
                    <h2>Pronóstico para los próximos días</h2>
                    <ul>
                        ${daily.time.map((date, index) => `
                            <li>
                                <strong>${date}:</strong> 
                                Máx: ${daily.temperature_2m_max[index]}°C, 
                                Mín: ${daily.temperature_2m_min[index]}°C
                            </li>
                        `).join("")}
                    </ul>
                `;
            }
        }
    });
});
