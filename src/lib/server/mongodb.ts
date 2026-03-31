// mongoDB
import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export function connectDB() {
	if (!clientPromise) {
		client = new MongoClient(env.MONGO_URI);
		clientPromise = client.connect();
	}

	return clientPromise;
}
