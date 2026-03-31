// mongoDB
import { MongoClient } from 'mongodb';

// Environment variables
import { MONGO_URI } from '$env/static/private';

const client = new MongoClient(MONGO_URI);

let isConnected = false;

export async function connectDB() {
	if (!isConnected) {
		await client.connect();
		isConnected = true;
	}

	return client;
}
