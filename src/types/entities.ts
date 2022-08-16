import { ObjectId } from 'mongodb';

export enum Entity {
  Thread = `THREAD`,
  Comment = `COMMENT`,
}

export interface Thread {
  _id: string;
  title: string;
  content: string;
}

export interface Comment {
  _id: string;
  content: string;
  parentEntity: Entity;
  parentId: string;
}

export interface CommentForView extends Comment {
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
  parentEntity: Entity;
  parentId: string;
  content: string;
}

export interface CommentsData {
  comments: Comment[];
}
