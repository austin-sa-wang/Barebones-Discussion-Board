import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Thread {
    _id: ID!
    title: String
    content: String
  }

  input ThreadInput {
    title: String
    content: String
  }

  type Query {
    threads: [Thread!]!
  }

  type Mutation {
    createThread(input: ThreadInput!): ID
  }
`;
