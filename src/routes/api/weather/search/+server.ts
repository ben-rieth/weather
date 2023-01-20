import type { RequestEvent, RequestHandler } from "../$types";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {

    // const city = url.searchParams.get('city');
    const country = url.searchParams.get('country') ?? '';
    // const units = url.searchParams.get('units');

    return new Response("Testing");
}