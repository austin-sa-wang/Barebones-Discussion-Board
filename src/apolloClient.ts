import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUri = `/api/graphql`;

const client = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const apolloClient = client;
