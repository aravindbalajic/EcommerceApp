import { MongoClient } from 'mongodb';

const MONGODB_URI = 'your_mongodb_atlas_uri';

let client: MongoClient;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db('arm-steel-db');
} 