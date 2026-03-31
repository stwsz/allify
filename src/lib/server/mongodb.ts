// mongoDB
import { MongoClient } from 'mongodb';
import { MONGO_URI, MONGO_DB } from '$env/static/private';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export function connectDB() {
	if (!clientPromise) {
		client = new MongoClient(MONGO_URI);
		clientPromise = client.connect();
	}

	return clientPromise;
}
