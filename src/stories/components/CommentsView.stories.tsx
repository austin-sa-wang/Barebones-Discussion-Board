import { Comment } from '../../types/entities';
import { useState } from 'react';
import { CommentsView } from '../../components/comments/CommentsView';

const StorybookMeta = {
  title: `components/CommentsView`,
  component: CommentsView,
};

export default StorybookMeta;

const rootComment: Comment = {
  _id: `rootComment`,
  content: `rootComment`,
  depth: 0,
};

const a2: Comment = {
  _id: `a2`,
  content: `a2`,
  parentCommentId: `rootComment`,
  depth: 1,
};

const a2a: Comment = {
  _id: `a2a`,
  content: `a2a`,
  parentCommentId: `a2`,
  depth: 2,
};

const data = [rootComment, a2, a2a];

export const CommentsViewStory = () => {
  // Sets the hooks for both the label and primary props
  const [commentForView] = useState<Comment[]>(data);

  return <CommentsView comments={commentForView} />;
};
