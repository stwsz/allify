// mongoDB
import { MongoClient } from 'mongodb';
import { MONGO_URI, MONGO_DB } from '$env/static/private';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export function connectDB() {
	console.log('🔗 [connectDB] Attempting to connect to MongoDB...');
	console.log(MONGO_URI, MONGO_DB);

	if (!clientPromise) {
		client = new MongoClient(MONGO_URI);
		clientPromise = client.connect();
	}

	return clientPromise;
}
