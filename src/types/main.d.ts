import { MongoClient } from 'mongodb';

declare global {
  const _mongoClientPromise: Promise<MongoClient>;
  interface Window {
    ethereum: any | undefined;
  }
}
