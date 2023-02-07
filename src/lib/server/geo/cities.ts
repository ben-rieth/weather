import { WEATHER_API_KEY } from "$env/static/private";
import axios from "axios";
import { getCountryCode, getCountryName } from "./counties"
import { getTimeZone } from "./timezone";

export type City = {
    lat: string,
    lon: string,
    countryName: string,
    countryCode: string,
    city: string,
    state: string,
    timeZone: string,
}

/**
 * Get the location data for the specified city
 * 
 * @param {string} city the name of the city
 * @param {string | undefined} country the country the city is in if known
 * @returns {City | undefined} the geolocation data for the city or undefined if city could not be found
 */
export const getCityLocation = async (city: string, country: string | undefined) => {

    // get country code
    let code = country ? await getCountryCode(country) : undefined;

    const query = `${city},,${code ? code : ""}`;

    // get basic geo location data
    try {
        const data = await axios.get(
            'https://api.openweathermap.org/geo/1.0/direct',
            {
                params: {
                    q: query,
                    limit: 1,
                    appid: WEATHER_API_KEY,
                }
            }
        ).then(res => res.data);

        // if no city found, return undefined
        if (data.length === 0) {
            throw new Error();
        }

        const lat = data[0]['lat'];
        const lon = data[0]['lon'];
        code = data[0]['country'];

        const [timeZone, countryName] = await Promise.all([
            getTimeZone(Number(lat), Number(lon)),
            getCountryName(code),
        ]);

        return {
            lat,
            lon,
            countryName,
            timeZone,
            city: data[0]['name'],
            countryCode: code,
            state: data[0]['state']
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error("Cannot retrieve data from server");
        } else {
            throw new Error("No city found");
        }
    }

}