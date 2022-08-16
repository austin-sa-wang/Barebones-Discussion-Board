import { CommentBase } from '@/types/entities';
import {
  PartialComment,
  sortCommentsAsFlattenedTree,
} from '../sortCommentsAsFlattenedTree';

type CommentForTest = Pick<CommentBase, 'content' | 'parentCommentId'> & {
  _id: string;
};

describe(`sortCommentsAsFlattenedTree`, () => {
  const rootComment: CommentForTest = {
    _id: `rootComment`,
    content: `rootComment`,
    parentCommentId: undefined,
  };

  const a2: CommentForTest = {
    _id: `a2`,
    content: `a2`,
    parentCommentId: `rootComment`,
  };

  const a2a: CommentForTest = {
    _id: `a2a`,
    content: `a2a`,
    parentCommentId: `a2`,
  };

  it(`1 level of nesting`, () => {
    const input: CommentForTest[] = [a2, rootComment];

    const expectedOrderedComments = [rootComment, a2];

    expect(
      sortCommentsAsFlattenedTree(input as unknown as PartialComment[]),
    ).toMatchObject(expectedOrderedComments);
  });

  it(`2 levels of nesting`, () => {
    const input: CommentForTest[] = [a2a, a2, rootComment];

    const expectedOrderedComments = [rootComment, a2, a2a];

    expect(
      sortCommentsAsFlattenedTree(input as unknown as PartialComment[]),
    ).toMatchObject(expectedOrderedComments);
  });

  it(`2 levels of nesting with multiple siblings`, () => {
    const a2b: CommentForTest = {
      _id: `a2b`,
      content: `a2b`,
      parentCommentId: `a2`,
    };

    const input: CommentForTest[] = [a2b, a2a, a2, rootComment];

    const expectedOrderedComments = [rootComment, a2, a2a, a2b];

    expect(
      sortCommentsAsFlattenedTree(input as unknown as PartialComment[]),
    ).toMatchObject(expectedOrderedComments);
  });
});
