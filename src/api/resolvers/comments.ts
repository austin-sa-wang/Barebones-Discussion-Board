import { connectToDatabase } from '@/lib/mongoClient';
import { CommentInput, ThreadInput } from '@/types/entities';
import { ObjectId } from 'mongodb';

export const thread = async (parent: unknown, args: { id: string }) => {
  const { db } = await connectToDatabase();

  const thread = await db
    .collection(`threads`)
    .findOne({ _id: new ObjectId(args.id) });

  return thread;
};

export const comments = async (parent: unknown, args: { threadId: string }) => {
  const { db } = await connectToDatabase();

  console.log(`args.threadId`, args.threadId);

  const comments = await db
    .collection(`comments`)
    .find({
      parentId: args.threadId,
    })
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
