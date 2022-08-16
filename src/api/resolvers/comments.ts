import { connectToDatabase } from '@/lib/mongoClient';
import { CommentBase, CommentInput, Entity } from '@/types/entities';
import { ObjectId } from 'mongodb';
import { isNil } from 'ramda';

export const thread = async (parent: unknown, args: { id: string }) => {
  const { db } = await connectToDatabase();

  const thread = await db
    .collection(`threads`)
    .findOne({ _id: new ObjectId(args.id) });

  return thread;
};

export const comments = async (parent: unknown, args: { threadId: string }) => {
  const { db } = await connectToDatabase();

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

  // @todo validate parent thread

  let depth = 0;
  if (args.parentEntity === Entity.Comment) {
    const parentComment = await db.collection<CommentBase>(`comments`).findOne(
      {
        _id: new ObjectId(args.parentId),
      },
      { projection: { depth: 1 } },
    );

    if (isNil(parentComment)) {
      throw new Error(`parent comment does not exist`);
    }

    depth = parentComment.depth + 1;
  }

  const createdThread = await db.collection(`comments`).insertOne({
    _id: new ObjectId(),
    threadId: args.threadId,
    parentEntity: args.parentEntity,
    parentId: args.parentId,
    content: args.content,
    createdAt: new Date(),
    depth,
  });

  return createdThread.insertedId;
};
