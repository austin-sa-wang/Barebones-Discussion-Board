import { ObjectId } from 'mongodb';

interface ThreadBase {
  title: string;
  content: string;
  userAccount: string;
}

export interface Thread extends ThreadBase {
  _id: ObjectId;
}

export interface ClientThread extends ThreadBase {
  _id: string;
}

interface CommentBase {
  content: string;
  parentCommentId: string;
  depth: number;
  createdAt: string;
  userAccount: string;
}

export interface Comment extends CommentBase {
  _id: ObjectId;
}

export interface ClientComment extends CommentBase {
  _id: string;
}

export interface ThreadData {
  thread: ClientThread;
}

export interface ThreadsData {
  threads: ClientThread[];
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
  comments: ClientComment[];
}
