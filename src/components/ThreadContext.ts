import { CommentBase, Thread } from '@/types/entities';
import { createContext } from 'react';

interface ThreadContext {
  thread: Thread | null;
  comments: CommentBase[];
  replyToComment(parentCommentId: CommentBase, content: string): void;
}

export const ThreadContext = createContext<ThreadContext>({
  thread: null,
  comments: [],
  replyToComment: () => {
    console.log(`stub`);
  },
});
