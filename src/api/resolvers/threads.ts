import { connectToDatabase } from '@/lib/mongoClient';
import { ThreadInput } from '@/types/entities';
import { ObjectId } from 'mongodb';

export const thread = async (parent: unknown, args: { id: ObjectId }) => {
  const { db } = await connectToDatabase();

  const thread = await db
    .collection(`threads`)
    .findOne({ _id: new ObjectId(args.id) });

  return thread;
};

export const threads = async () => {
  const { db } = await connectToDatabase();

  const threads = await db
    .collection(`threads`)
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return threads;
};

export const createThread = async (
  parent: unknown,
  args: { input: ThreadInput },
) => {
  const { db } = await connectToDatabase();

  const createdThread = await db.collection(`threads`).insertOne({
    _id: new ObjectId(),
    title: args.input.title,
    content: args.input.content,
    createdAt: new Date(),
  });

  return createdThread.insertedId;
};
