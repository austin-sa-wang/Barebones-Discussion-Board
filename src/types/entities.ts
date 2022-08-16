import { ObjectId } from 'mongodb';

export interface Thread {
  _id: ObjectId;
  title: string;
  content: string;
  userAccount: string;
}

export interface Comment {
  _id: ObjectId;
  content: string;
  parentCommentId: string;
  depth: number;
  createdAt: string;
  userAccount: string;
}

export interface ThreadData {
  thread: Thread;
}

export interface ThreadsData {
  threads: Thread[];
}

export interface ThreadInput {
  title: string;
  content: string;
}

export interface CommentInput {
  threadId: string;
  parentCommentId?: string;
  content: string;
}

export interface CommentsData {
  comments: Comment[];
}
