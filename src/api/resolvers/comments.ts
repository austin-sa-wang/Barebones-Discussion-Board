import { connectToDatabase } from '@/lib/mongoClient';
import { CommentInput, ThreadInput } from '@/types/entities';
import { ObjectId } from 'mongodb';

export const thread = async (parent: unknown, args: { id: ObjectId }) => {
  const { db } = await connectToDatabase();

  const thread = await db
    .collection(`threads`)
    .findOne({ _id: new ObjectId(args.id) });

  return thread;
};

export const comments = async () => {
  const { db } = await connectToDatabase();

  const comments = await db
    .collection(`comments`)
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return comments;
};

export const createComment = async (parent: unknown, args: CommentInput) => {
  const { db } = await connectToDatabase();

  const createdThread = await db.collection(`comments`).insertOne({
    _id: new ObjectId(),
    parentEntity: args.parentEntity,
    parentId: args.parentId,
    content: args.content,
    createdAt: new Date(),
  });

  return createdThread.insertedId;
};
