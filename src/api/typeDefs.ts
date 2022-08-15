import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Thread {
    _id: ID!
    title: String
  }

  type Query {
    threads: [Thread!]!
  }
`;
