import { ClientComment } from '../../types/entities';
import { useState } from 'react';
import { CommentsView } from '../../components/comments/CommentsView';

const StorybookMeta = {
  title: `components/CommentsView`,
  component: CommentsView,
};

export default StorybookMeta;

const rootComment: ClientComment = {
  _id: `rootComment`,
  content: `rootComment`,
  parentCommentId: undefined,
  depth: 0,
  createdAt: `2022-08-15T09:13:25.634+00:00`,
  userAccount: `userAcount`,
};

const a2: ClientComment = {
  _id: `a2`,
  content: `a2`,
  parentCommentId: `rootComment`,
  depth: 1,
  createdAt: `2022-08-15T09:13:25.634+00:00`,
  userAccount: `userAcount`,
};

const a2a: ClientComment = {
  _id: `a2a`,
  content: `a2a`,
  parentCommentId: `a2`,
  depth: 2,
  createdAt: `2022-08-15T09:13:25.634+00:00`,
  userAccount: `userAcount`,
};

const data = [rootComment, a2, a2a];

export const CommentsViewStory = () => {
  // Sets the hooks for both the label and primary props
  const [commentForView] = useState<ClientComment[]>(data);

  return <CommentsView comments={commentForView} />;
};
