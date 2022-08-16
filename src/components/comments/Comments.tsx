import { isNil } from 'ramda';
import { useContext } from 'react';
import { ThreadContext } from '../ThreadContext';
import { CommentsView } from './CommentsView';

export default function Comments() {
  const threadContext = useContext(ThreadContext);

  return (
    <>
      {isNil(threadContext.comments) ? null : (
        <CommentsView comments={threadContext.comments} />
      )}
    </>
  );
}
