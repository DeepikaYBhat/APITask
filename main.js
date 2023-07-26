const axios = require('axios');
const readline = require('readline');

const WEATHER_API_URL = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fetchWeatherData() {
    try {
        const response = await axios.get(WEATHER_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function getWeatherByDate(date) {
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        const filteredData = weatherData.list.filter((item) => item.dt_txt.includes(date));
        console.log("Temp: ", filteredData[0].main.temp);
    } else {
        console.log('No weather data available for the specified date.');
    }
}

async function getWindSpeedByDate(date) {
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        const filteredData = weatherData.list.filter((item) => item.dt_txt.includes(date));
        if (filteredData.length > 0) {
            const windSpeed = filteredData[0].wind.speed;
            console.log(`Wind Speed: ${windSpeed} m/s`);
        } else {
            console.log('No weather data available for the specified date.');
        }
    }
}

async function getPressureByDate(date) {
    const weatherData = await fetchWeatherData();
    if (weatherData) {
        const filteredData = weatherData.list.filter((item) => item.dt_txt.includes(date));
        if (filteredData.length > 0) {
            const pressure = filteredData[0].main.pressure;
            console.log(`Pressure: ${pressure} hPa`);
        } else {
            console.log('No weather data available for the specified date.');
        }
    }
}

async function main() {
    while (true) {
        console.log('Menu:');
        console.log('1. Get weather');
        console.log('2. Get Wind Speed');
        console.log('3. Get Pressure');
        console.log('0. Exit');

        const option = await new Promise((resolve) => {
            rl.question('Enter your choice:', resolve);
        });

        switch (parseInt(option)) {
            case 1:
                const dateForWeather = await new Promise((resolve) => {
                    rl.question('Enter the date (e.g., 2023-07-30 15:00:00): ', resolve);
                });
                await getWeatherByDate(dateForWeather);
                break;
            case 2:
                const dateForWindSpeed = await new Promise((resolve) => {
                    rl.question('Enter the date (e.g., 2023-07-30 15:00:00): ', resolve);
                });
                await getWindSpeedByDate(dateForWindSpeed);
                break;
            case 3:
                const dateForPressure = await new Promise((resolve) => {
                    rl.question('Enter the date (e.g., 2023-07-30 15:00:00): ', resolve);
                });
                await getPressureByDate(dateForPressure);
                break;
            case 0:
                // console.log('exiting');
                rl.close();
                return;
            default:
                console.log('Invalid option. Try again.');
                break;
        }
    }
}

main();
