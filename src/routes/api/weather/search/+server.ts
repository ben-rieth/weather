import { getCityLocation } from "$lib/server/geo/cities";
import { getWeatherDataByCoords } from "$lib/server/weather";
import { getUnitsBasedOnCountry } from "$lib/units";
import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "../$types";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {

    const city = url.searchParams.get('city');

    if (!city) {
        return new Response("City must be provided", { status: 400 });
    }

    const country = url.searchParams.get('country') ?? undefined;
    const providedUnits = url.searchParams.get('units') ?? undefined;

    if ((providedUnits !== 'imperial' && providedUnits !== 'metric') || !providedUnits) {
        return new Response("Units must be either imperial or metric", { status: 400 });
    }

    let cityData;
    try {
        cityData = await getCityLocation(city, country);
    } catch (err) {
        return new Response("Cannot get city data from server", { status: 500 });
    }

    const units : 'imperial' | 'metric' = providedUnits ?? getUnitsBasedOnCountry(cityData.countryCode);

    try {
        const data = await getWeatherDataByCoords(
            cityData.lat, 
            cityData.lon, 
            units, 
            cityData.timeZone
        );

        return json(data, { status: 200 })
    } catch (err) {
        return new Response("Cannot get weather data from server", { status: 500 })
    }
}