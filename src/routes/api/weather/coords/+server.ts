import { getGeoDataFromCoords } from "$lib/server/geo/coords";
import { getWeatherDataByCoords } from "$lib/server/weather";
import { getUnitsBasedOnCountry } from "$lib/units";
import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "../$types";
import type { WeatherData } from "../../../../types/Weather";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const providedUnits = url.searchParams.get('units') ?? undefined;

    if (!lat || !lon) {
        return new Response("Both latitude and longitude must be provided", {status: 400});
    } else if (isNaN(Number(lat)) || isNaN(Number(lon))) {
        return new Response("Latitude and longitude must be numbers", { status: 400 });
    }

    if ((providedUnits !== 'imperial' && providedUnits !== 'metric') || !providedUnits) {
        return new Response("Units must be either imperial or metric", { status: 400 });
    }

    let geoData;
    try {
        geoData = await getGeoDataFromCoords(Number(lat), Number(lon));
    } catch(err) {
        return new Response("Cannot get location data from provided coords", { status: 500 })
    }

    const units : 'imperial' | 'metric' = providedUnits ?? getUnitsBasedOnCountry(geoData.countryCode);

    try {
        const weather: WeatherData = await getWeatherDataByCoords(lat, lon, units, geoData.zone);
        return json(weather, { status: 200 });
    } catch (err) {
        return new Response("Cannot get weather data from server", { status: 500 });
    }
};