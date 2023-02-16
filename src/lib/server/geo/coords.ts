import { WEATHER_API_KEY } from "$env/static/private"
import axios from "axios"
import type { City, ReverseGeocodingApiResult } from "../../../types/Geo";
import { getCountryData } from "./counties";
import { getTimeZone } from "./timezone";

export const getGeoDataFromCoords = async (lat: number, lon: number) : Promise<City> => {
    const geoData : ReverseGeocodingApiResult = await axios.get(
        'https://api.openweathermap.org/geo/1.0/reverse',
        {
            params: {
                lat,
                lon,
                limit: 1,
                appid: WEATHER_API_KEY,
            }
        }
    ).then(res => res.data);
    
    const [timezone, country] = await Promise.all([
        getTimeZone(lat, lon),
        getCountryData(geoData[0]['country'])
    ]);

    return {
        lat,
        lon,
        city: geoData[0]['name'],
        countryCode: geoData[0]['country'],
        countryFlag: country.flag,
        countryName: country.name,
        state: geoData[0]['state'],
        zone: timezone,
    }
}