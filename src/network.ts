import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export async function getWeather(zip: any) {
  const response = await axios.get(baseUrl, {
    params: {
      zip: `${zip},us`,
      appid: process.env.API_KEY
    }
  });
  return response.data.weather as [WeatherData];
}
