import { ClientComment, Thread } from '@/types/entities';
import { createContext } from 'react';

export interface IThreadContext {
  thread: Thread | undefined;
  comments: ClientComment[] | undefined;
  replyToComment(parentCommentId: string, content: string): Promise<unknown>;
}

export const ThreadContext = createContext<IThreadContext>({
  thread: undefined,
  comments: [],
  replyToComment: async () => {
    console.log(`stub`);
  },
});
