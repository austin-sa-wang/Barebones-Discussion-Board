import { threads, createThread, thread } from './threads';

export const resolvers = {
  Query: {
    threads,
    thread,
  },
  Mutation: {
    createThread,
  },
};
