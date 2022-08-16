import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Thread {
    _id: ID!
    title: String
    content: String
    createdAt: String
    userAccount: String
  }

  type Comment {
    _id: ID!
    content: String
    parentCommentId: ID
    depth: Int
    createdAt: String
    userAccount: String
  }

  input ThreadInput {
    title: String
    content: String
  }

  type Query {
    thread(id: ID!): Thread
    threads: [Thread!]!
    comments(threadId: ID!): [Comment!]!
  }

  type Mutation {
    createThread(input: ThreadInput!): ID
    createComment(threadId: ID!, parentCommentId: ID, content: String!): ID
  }
`;
