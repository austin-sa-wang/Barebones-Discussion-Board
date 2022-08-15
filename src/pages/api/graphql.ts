// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '@/lib/mongoClient';
import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const typeDefs = /* GraphQL */ `
  type Query {
    threads: [Thread!]!
  }
  type Thread {
    _id: String
    title: String
  }
`;

const resolvers = {
  Query: {
    async threads() {
      const { db } = await connectToDatabase();

      const threads = await db.collection(`threads`).find().toArray();
      return threads;
    },
  },
};

export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  endpoint: `/api/graphql`,
  schema: {
    typeDefs,
    resolvers,
  },
});
