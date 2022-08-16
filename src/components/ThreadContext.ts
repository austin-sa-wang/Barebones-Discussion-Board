import { CommentBase, Thread } from '@/types/entities';
import { createContext } from 'react';

interface ThreadContext {
  thread: Thread | undefined;
  comments: CommentBase[] | undefined;
  replyToComment(parentCommentId: CommentBase, content: string): void;
}

export const ThreadContext = createContext<ThreadContext>({
  thread: null,
  comments: [],
  replyToComment: () => {
    console.log(`stub`);
  },
});
