
import { type RequestHandler } from '@sveltejs/kit';=


export const POST: RequestHandler = async ({ request }) => {
    const { topic, url }: { topic: string, url: string } = await request.json();

    return new Response(JSON.stringify({ summary }));
}
