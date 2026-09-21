const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
export { searchCities as searchWorldwideDestinations } from "./geoapify";

export async function getPlaceWeather(latitude, longitude, { signal } = {}) {
  const params = new URLSearchParams({ latitude:String(latitude), longitude:String(longitude), current:"temperature_2m,apparent_temperature,weather_code,wind_speed_10m", daily:"temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset", forecast_days:"5", timezone:"auto" });
  const response = await fetch(`${WEATHER_URL}?${params}`, { signal });
  if (!response.ok) throw new Error("Weather is temporarily unavailable.");
  return response.json();
}
export function weatherLabel(code) { if(code===0)return"Clear sky"; if([1,2].includes(code))return"Mostly clear"; if(code===3)return"Overcast"; if([45,48].includes(code))return"Foggy"; if([51,53,55,56,57].includes(code))return"Drizzle"; if([61,63,65,66,67,80,81,82].includes(code))return"Rain"; if([71,73,75,77,85,86].includes(code))return"Snow"; if([95,96,99].includes(code))return"Thunderstorms"; return"Current conditions"; }
