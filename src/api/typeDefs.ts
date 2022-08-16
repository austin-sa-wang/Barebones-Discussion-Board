import { gql } from '@apollo/client';

export const typeDefs = gql`
  enum Entity {
    THREAD
    COMMENT
  }

  type Thread {
    _id: ID!
    title: String
    content: String
  }

  type Comment {
    _id: ID!
    content: String
    parentCommentId: ID
    depth: Int
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
