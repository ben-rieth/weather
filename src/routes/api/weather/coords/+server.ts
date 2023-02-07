import type { RequestEvent, RequestHandler } from "../$types";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    if (!lat || !lon) {
        return new Response("Both latitude and longitude must be provided", {status: 400});
    }

    return new Response("Test", { status: 200 });
};