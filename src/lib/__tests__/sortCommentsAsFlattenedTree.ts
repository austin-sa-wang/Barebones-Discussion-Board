import { CommentBase } from '@/types/entities';
import { sortCommentsAsFlattenedTree } from '../sortCommentsAsFlattenedTree';

describe(`sortCommentsAsFlattenedTree`, () => {
  const rootComment: CommentBase = {
    _id: `rootComment`,
    content: `rootComment`,
    depth: 0,
  };

  const a2: CommentBase = {
    _id: `a2`,
    content: `a2`,
    parentCommentId: `rootComment`,
    depth: 1,
  };

  const a2a: CommentBase = {
    _id: `a2a`,
    content: `a2a`,
    parentCommentId: `a2`,
    depth: 2,
  };

  it(`1 level of nesting`, () => {
    const input: CommentBase[] = [a2, rootComment];

    const expectedOrderedComments = [rootComment, a2];

    expect(sortCommentsAsFlattenedTree(input)).toMatchObject(
      expectedOrderedComments,
    );
  });

  it(`2 levels of nesting`, () => {
    const input: CommentBase[] = [a2a, a2, rootComment];

    const expectedOrderedComments = [rootComment, a2, a2a];

    expect(sortCommentsAsFlattenedTree(input)).toMatchObject(
      expectedOrderedComments,
    );
  });

  it(`2 levels of nesting with multiple siblings`, () => {
    const a2b: CommentBase = {
      _id: `a2b`,
      content: `a2b`,
      parentCommentId: `a2`,
      depth: 2,
    };

    const input: CommentBase[] = [a2b, a2a, a2, rootComment];

    const expectedOrderedComments = [rootComment, a2, a2a, a2b];

    expect(sortCommentsAsFlattenedTree(input)).toMatchObject(
      expectedOrderedComments,
    );
  });
});
