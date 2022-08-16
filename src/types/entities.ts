import { ObjectId } from 'mongodb';

export enum Entity {
  Thread = `THREAD`,
  Comment = `COMMENT`,
}

export interface Thread {
  _id: ObjectId;
  title: string;
  content: string;
}

export interface CommentBase {
  _id: ObjectId;
  content: string;
  parentEntity: Entity;
  parentId: string;
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
  parentEntity: Entity;
  parentId: string;
  content: string;
}

export interface CommentsData {
  comments: Comment[];
}
