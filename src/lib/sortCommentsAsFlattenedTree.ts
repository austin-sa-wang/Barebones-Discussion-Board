import { sortBy } from 'ramda';
import { arrayToTree, TreeItem } from 'performant-array-to-tree';

import { depth } from 'treeverse';
import { Comment } from '@/types/entities';

export type PartialComment = Pick<Comment, '_id' | 'parentCommentId'>;

/**
 *
 * Get the nested comments in a flat structure in createdAt ASC order
 *
 * @performanceAlert
 * This solution is unscalable for large amount of data
 *
 * @technicalDesign
 * A more performant design is to store the tree structure in database in depth-first order.
 * This way we don't need to run through this algorithm every time
 *
 */
export const sortCommentsAsFlattenedTree = (
  comments: PartialComment[],
): unknown[] => {
  // build map per depth then assemble

  // @assumption assume nodes are already sorted by depth. This library requires it for O(n)
  const tree = arrayToTree(comments, {
    id: `_id`,
    parentId: `parentCommentId`,
  });

  // @dirty the order of the comments is decided from 2 different places
  // 1) from server, when we query mongo
  // 2) the sortedTree below
  // Reason:
  // We rely on the order from mongo as a performance thing (blind optimization)
  // However, the way depth first tree travesal here works is it flips the order.
  // so when we query mongo we actually do it in reverse, so that the traversal here flips it back
  const sortedTree = sortBy((node) => node.data.createdAt, tree);

  const result = sortedTree.reduce<PartialComment[]>((aggregate, current) => {
    depth<TreeItem>({
      tree: current,
      getChildren: (node) => node.children,
      visit: (node) => aggregate.push(node.data as PartialComment),
    });

    return aggregate;
  }, []);

  return result;
};
