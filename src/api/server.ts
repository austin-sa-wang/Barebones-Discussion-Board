// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isNil } from 'ramda';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export const createGraphqlServer = () => {
  return createServer<{
    req: NextApiRequest;
    res: NextApiResponse;
  }>({
    endpoint: `/api/graphql`,
    schema: {
      typeDefs,
      resolvers,
    },
    context: async ({ request }) => {
      const authHeader = request.headers.get(`authorization`);
      const userAccount = isNil(authHeader)
        ? null
        : authHeader.replace(`Bearer `, ``);

      return {
        userAccount,
      };
    },
  });
};
