import { CommentBase, Thread } from '@/types/entities';
import { createContext } from 'react';

export interface IThreadContext {
  thread: Thread | undefined;
  comments: CommentBase[] | undefined;
  replyToComment(parentCommentId: string, content: string): void;
}

export const ThreadContext = createContext<IThreadContext>({
  thread: undefined,
  comments: [],
  replyToComment: () => {
    console.log(`stub`);
  },
});
