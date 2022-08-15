import { threads, createThread, thread } from './threads';
import { comments, createComment } from './comments';

export const resolvers = {
  Query: {
    comments,
    threads,
    thread,
  },
  Mutation: {
    createThread,
    createComment,
  },
};
