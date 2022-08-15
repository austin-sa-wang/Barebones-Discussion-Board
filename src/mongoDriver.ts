import { Db, MongoClient } from 'mongodb';
import { isNil } from 'ramda';

const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  if (isNil(uri) || isNil(database)) {
    throw new Error(
      `Define the MONGODB_URI and MONGODB_DB environmental variable`,
    );
  }

  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(database);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
