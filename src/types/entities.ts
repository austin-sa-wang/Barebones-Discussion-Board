import { ObjectId } from 'mongodb';

export interface Thread {
  _id: ObjectId;
  title: string;
  content: string;
}

export interface CommentBase {
  _id: ObjectId;
  content: string;
  parentCommentId: string;
  depth: number;
}

export interface Comment extends CommentBase {
  childrenComments: Comment[];
}

export type FlattenedCommentNode = CommentBase;

export type FlattenedCommentTree = FlattenedCommentNode[];
export interface CommentForView {
  childrenComments: CommentForView[];
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
