import { CommentForView, Entity } from '../../types/entities';
import { useState } from 'react';
import { Comment } from '../../components/comments/Comment';

// /stories/pages/home.stories.jsx
export default {
  title: `components/Comment`,
  component: Comment,
};

const nestedComment: CommentForView = {
  _id: `someNestedCommentId`,
  parentEntity: Entity.Thread,
  parentId: `someNestedCommentParentId`,
  content: `Some nested comment content`,
  childrenComments: [],
};

const data: CommentForView = {
  _id: `someCommentId`,
  parentEntity: Entity.Thread,
  parentId: `someParentId`,
  content: `Some comment content`,
  childrenComments: [nestedComment],
};

export const CommentStory = () => {
  // Sets the hooks for both the label and primary props
  const [commentForView] = useState<CommentForView>(data);

  return <Comment comment={commentForView} />;
};
