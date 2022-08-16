import { Comment, Entity, FlattenedCommentTree } from '@/types/entities';
import { commentsFlattener } from '../commentsFlattener';

describe(`commentsFlattener`, () => {
  const nestedComment: Comment = {
    _id: `someNestedCommentId`,
    parentEntity: Entity.Comment,
    parentId: `someCommentId`,
    content: `Some nested comment content`,
    childrenComments: [],
  };

  const data: Comment = {
    _id: `someCommentId`,
    parentEntity: Entity.Thread,
    parentId: `someParentId`,
    content: `Some comment content`,
    childrenComments: [nestedComment],
  };

  const input = data;

  // const expected: FlattenedCommentTree = [{

  // }]

  it(`says hi`, () => {
    expect(commentsFlattener()).toEqual(`hi`);
  });
});
