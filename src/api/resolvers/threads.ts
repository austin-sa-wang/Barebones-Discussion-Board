import { connectToDatabase } from '@/lib/mongoClient';

export const threads = async () => {
  const { db } = await connectToDatabase();

  const threads = await db.collection(`threads`).find().toArray();

  return threads;
};
