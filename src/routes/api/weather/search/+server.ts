import { getCityLocation } from "$lib/server/geo/cities";
import { getWeatherDataByCoords } from "$lib/server/weather";
import { getUnitsBasedOnCountry } from "$lib/units";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import { z } from 'zod';

const schema = z.object({
    city: z.string(),
    country: z.string().optional(),
    units: z.enum(["imperial", "metric"]).optional(),
})

export const GET: RequestHandler = async ({ url }: RequestEvent) => {

    const city = url.searchParams.get('city') ?? undefined;
    const country = url.searchParams.get('country') ?? undefined;
    const providedUnits = url.searchParams.get('units') ?? undefined;

    let params;
    try {
        params = schema.parse({ city, country, units: providedUnits });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response(err['issues'][0]['message'], { status: 400 });
        }

        return new Response('Error', { status: 400 });
    }

    let cityData;
    try {
        cityData = await getCityLocation(params.city, params.country);
    } catch (err) {
        return new Response("Cannot get city data from server", { status: 500 });
    }

    const units: 'imperial' | 'metric' = params.units ?? getUnitsBasedOnCountry(cityData.countryCode);

    try {
        const data = await getWeatherDataByCoords(
            cityData.lat,
            cityData.lon,
            units,
            cityData.zone
        );

        return json(
            {
                city: cityData,
                units,
                ...data,
            },
            { status: 200 }
        );
    } catch (err) {
        return new Response("Cannot get weather data from server", { status: 500 })
    }
}