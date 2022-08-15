import { threads, createThread } from './threads';

export const resolvers = {
  Query: {
    threads,
  },
  Mutation: {
    createThread,
  },
};
