import { connectToDatabase } from '@/lib/mongoClient';
import { ThreadInput } from '@/types/entities';
import { ObjectId } from 'mongodb';

export const threads = async () => {
  const { db } = await connectToDatabase();

  const threads = await db.collection(`threads`).find().toArray();

  return threads;
};

export const createThread = async (
  parent: unknown,
  args: { input: ThreadInput },
) => {
  const { db } = await connectToDatabase();

  console.log(`args`, args);

  const createdThread = await db.collection(`threads`).insertOne({
    _id: new ObjectId(),
    title: args.input.title,
    content: args.input.content,
  });

  console.log(`createdThread`, createdThread);

  return createdThread.insertedId;
};
