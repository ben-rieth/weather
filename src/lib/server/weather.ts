import axios from "axios";
import { WEATHER_API_KEY } from "$env/static/private";
import type { CurrentData, CurrentWeatherApiResult, DateAndTime, ForecastAPIResult, ForecastData, ForecastDataWithoutAverages } from "../../types/Weather";
import { getTimeFromDate, unixToTime } from "$lib/time";
import { windDirectionFromDegree } from "$lib/wind";

const formatForecastData = (
    weatherForecast: ForecastAPIResult, 
    timezone: string
): ForecastData[] => {

    // get the starting date
    let currentDate = new Date(weatherForecast.list[0]['dt'] * 1000).toLocaleDateString([], { timeZone: timezone});

    const data : ForecastDataWithoutAverages[] = [];

    // format the data for use on the frontend
    weatherForecast.list.forEach((timestamp) => {
        // get the date of this time stamp
        const timestampDate = new Date(timestamp.dt * 1000).toLocaleDateString([], { timeZone: timezone });

        // get the necessary data for this timestamp
        const timestampData = {
            time: unixToTime(timestamp.dt, timezone),
            timeUnix: timestamp.dt * 1000,
            temp: timestamp.main.temp.toFixed(1),
            weather: timestamp.weather[0]['main'],
            weatherDescription: timestamp.weather[0]['description'],
            precipitation: timestamp['pop'] * 100
        }

        // if the date is not already in the data, create a new date in the chart
        // else append the new timestamp to the current day
        if (currentDate !== timestampDate || data.length === 0) {
            data.push({
                date: timestampDate,
                weekday: new Date(Date.parse(timestampDate)).toLocaleDateString([], { weekday: 'long'}),
                hourly: [
                    timestampData
                ]
            });

            currentDate = timestampDate;
        } else {
            data[data.length - 1]['hourly'].push(timestampData);
        }
    });

    // get average information for the day
    const finalData = data.map(timestamp => {

        let lowestTemp = timestamp.hourly[0].temp;
        let highestTemp = timestamp.hourly[0].temp;

        const weatherMap = new Map<string, number>();

        for (const hour of timestamp.hourly) {
            // see if current temp is the lowest so far
            if (hour.temp > highestTemp) {
                highestTemp = hour.temp;
            } 
            
            // see if current temp is the lowest so far
            if (hour.temp < lowestTemp) {
                lowestTemp = hour.temp;
            }

            // see how many times a certain weather pattern appears
            const currentValueInMap = weatherMap.get(hour.weather);
            if (currentValueInMap) {
                weatherMap.set(hour.weather, currentValueInMap + 1);
            } else {
                weatherMap.set(hour.weather, 1);
            }
        }

        const averageWeather = [...weatherMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a)[0];

        return {
            ...timestamp,
            high: highestTemp,
            low: lowestTemp,
            averageWeather,
        };
    });

    return finalData;
}

const formatCurrentWeatherData = (
    currentWeather: CurrentWeatherApiResult, 
    timezone: string
) : DateAndTime & { current: CurrentData } => {

    return {
        date: new Date().toLocaleDateString([], { timeZone: timezone }),
        time: getTimeFromDate(new Date(), timezone),
        current: {
            temp: currentWeather.main.temp.toFixed(1),
            feelsLike: currentWeather.main.feels_like.toFixed(1),
            weather: currentWeather['weather'][0]['main'],
            weatherDescription: currentWeather['weather'][0]['description'],
            humidity: currentWeather.main.humidity,
            windSpeed: currentWeather.wind.speed,
            windDirection: windDirectionFromDegree(currentWeather.wind.deg),
            sunriseTime: unixToTime(currentWeather.sys.sunrise, timezone),
            sunsetTime: unixToTime(currentWeather.sys.sunset, timezone),
            sunriseUnix: currentWeather.sys.sunrise * 1000,
            sunsetUnix: currentWeather.sys.sunset * 1000,
            pressure: currentWeather.main.pressure,
        }
    }
}

export const getWeatherDataByCoords = async (
    lat: number, 
    lon: number,
    units: "imperial" | "metric", 
    timezone: string,
) => {

    const currentWeatherPromise = axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                lat,
                lon,
                units,
                appid: WEATHER_API_KEY
            }
        }
    ).then(res => formatCurrentWeatherData(res.data, timezone));

    const weatherForecastPromise = axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
            params: {
                lat,
                lon,
                units,
                appid: WEATHER_API_KEY,
                cnt: 20,
            }
        }
    ).then(res => formatForecastData(res.data, timezone));

    const [currentWeather, weatherForecast] = await Promise.all(
        [currentWeatherPromise, weatherForecastPromise]
    );

    return {
        ...currentWeather,
        forecast: weatherForecast,
    };
}