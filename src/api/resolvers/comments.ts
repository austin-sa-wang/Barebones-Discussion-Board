import { connectToDatabase } from '@/lib/mongoClient';
import { sortCommentsAsFlattenedTree } from '@/lib/sortCommentsAsFlattenedTree';
import { Comment, CommentInput } from '@/types/entities';
import { GraphqlResolverContext } from '@/types/server';
import { ObjectId } from 'mongodb';
import { isNil } from 'ramda';

export const comments = async (parent: unknown, args: { threadId: string }) => {
  const { db } = await connectToDatabase();

  const comments = await db
    .collection<Comment>(`comments`)
    .find({
      threadId: args.threadId,
    })
    .sort({ depth: 1, createdAt: -1 }) // @implicitDependency the createdAt order dicates how FE shows
    .toArray();

  const sortedComments = sortCommentsAsFlattenedTree(comments);
  return sortedComments;
};

export const createComment = async (
  parent: unknown,
  args: CommentInput,
  context: GraphqlResolverContext,
) => {
  const { db } = await connectToDatabase();

  // @todo validate parent thread

  let depth = 0;
  if (!isNil(args.parentCommentId)) {
    const parentComment = await db.collection<Comment>(`comments`).findOne(
      {
        _id: new ObjectId(args.parentCommentId),
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
    parentCommentId: args.parentCommentId,
    content: args.content,
    createdAt: new Date(),
    depth,
    userAccount: context.userAccount,
  });

  return createdThread.insertedId;
};
