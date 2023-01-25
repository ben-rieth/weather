import axios from "axios";
import { TIMEZONE_API_KEY } from "$env/static/private";

/**
 * Gets the time zone based on the given latitude and longitude
 * @param {number } lat the latitude
 * @param {number} lon the longitude
 * @returns {Promise<string>} the time zone
 */
export const getTimeZone = async (lat: number, lon: number): Promise<string> => {
    const data = await axios.get(
        'http://api.timezonedb.com/v2.1/get-time-zone',
        {
            params: {
                key: TIMEZONE_API_KEY,
                by: 'position',
                lat: lat,
                lng: lon,
                format: 'json',
                fields: 'zoneName'
            }
        }
    ).then(response => response.data);

    return data.zoneName;
}