
import { type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    const { server } = params;
    
    return new Response(JSON.stringify({ server }));
};
