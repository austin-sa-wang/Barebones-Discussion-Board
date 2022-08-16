import { Comment, Entity, FlattenedCommentTree } from '@/types/entities';
import { commentsFlattener } from '../commentsFlattener';

describe(`commentsFlattener`, () => {
  const nestedComment: Comment = {
    _id: `someNestedCommentId`,
    parentCommentId: `someCommentId`,
    content: `Some nested comment content`,
    childrenComments: [],
  };

  const data: Comment = {
    _id: `someCommentId`,
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
