import { Database } from '$lib/database';
import { type Handle } from '@sveltejs/kit';

const db = new Database('path/to/datafile.json');

db.loadData();

export const handle: Handle = async ({ event, resolve }) => {
    // You can handle server shutdown using process events
    // But note that in a serverless environment this might not work as expected
    process.on('SIGINT', () => {
        db.stopAutoSave();
        db.saveData(); // Save data one last time before shutting down
        process.exit(0);
    });

    const response = await resolve(event);
    return response;
}
