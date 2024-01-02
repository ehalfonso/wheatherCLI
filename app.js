import { throws } from "assert";
import axios from "axios";
import chalk from "chalk";

const API_KEY = "14ba44243a46c78aa0657c1deb3f8baf";

function displayWeather(city, weatherData) {
  console.log(chalk.yellow(`\nInformacion del clima: ${city}`));
  console.log(chalk.cyan(`Descipcion:`), weatherData.weather[0].description);
  console.log(chalk.cyan(`Temperatura:`), `${weatherData.main.temp} C`);
  console.log(chalk.cyan(`Humedad:`), `${weatherData.main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del viento:"),
    `${weatherData.wind.speed} m/s`
  );
}

function handleError(err) {
  console.log(chalk.red("Error: "), err.message);
  process.exit(1);
}
async function getWeather(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
    throw new Error(`no es posible obtener la informacion deseada ${city}`);
  }
}

function initApp() {
  let city = process.argv[2];
  //console.log(city);

  if (!city) {
    console.log(chalk.red("Por favor proporcione el nombre de una ciudad"));
    console.log(
      chalk.red("Ejecuta el siguiente comando: node app.js [nombre ciudad]")
    );
  }
  getWeather(city)
    .then((weatherData) => displayWeather(city, weatherData))
    .catch(handleError);
}

initApp();
