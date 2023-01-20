import type { RequestEvent, RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }: RequestEvent) => {
    return new Response("Testing");
}