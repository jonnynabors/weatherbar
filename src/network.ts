import axios from "axios";

const baseUrl = "https://pro.openweathermap.org/data/2.5/climate/month";

export async function getWeather(zip: any) {
  return await axios.get(baseUrl, {
    params: {
      zip: `${zip},us`,
      appid: process.env.API_KEY
    }
  });
}
