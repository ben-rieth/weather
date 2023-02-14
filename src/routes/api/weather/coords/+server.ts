import { getGeoDataFromCoords } from "$lib/server/geo/coords";
import { getWeatherDataByCoords } from "$lib/server/weather";
import { getUnitsBasedOnCountry } from "$lib/units";
import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "../$types";
import type { WeatherData } from "../../../../types/Weather";
import { z } from 'zod';

const schema = z.object({
    lat: z.number({ required_error: 'Latitude is required', invalid_type_error: 'Latitude must be a number'})
        .min(-90, "Latitude must be -90 or greater").max(90, "Latitude must be smaller than 90"),
    lon: z.number({ required_error: 'Longitude is required', invalid_type_error: 'Longitude must be a number'})
        .min(-180, "Longitude must be -`180 or greater").max(180, "Longitude must be smaller than 180"),
    units: z.enum(["imperial", "metric"]).optional()
});

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    const lat = Number(url.searchParams.get('lat') ?? undefined);
    const lon = Number(url.searchParams.get('lon') ?? undefined);
    const providedUnits = url.searchParams.get('units') ?? undefined;

    let params;
    try {
        params = schema.parse({ lat, lon, units: providedUnits });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response(err['issues'][0]['message'], { status: 400 });
        }

        return new Response('Error', { status: 400 });
    }

    let geoData;
    try {
        geoData = await getGeoDataFromCoords(Number(lat), Number(lon));
    } catch(err) {
        console.log(err);
        return new Response("Cannot get location data from provided coords", { status: 500 })
    }

    const units : 'imperial' | 'metric' = params.units ?? getUnitsBasedOnCountry(geoData.countryCode);

    try {
        const weather: WeatherData = await getWeatherDataByCoords(params.lat, params.lon, geoData.city, geoData.countryName, units, geoData.zone);
        return json(weather, { status: 200 });
    } catch (err) {
        return new Response("Cannot get weather data from server", { status: 500 });
    }
};