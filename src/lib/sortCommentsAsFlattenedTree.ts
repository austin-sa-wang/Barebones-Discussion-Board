import { CommentBase } from '@/types/entities';
import { sortBy } from 'ramda';
import { arrayToTree, TreeItem } from 'performant-array-to-tree';

import { depth } from 'treeverse';
/**
 * @performanceAlert
 * This solution is unscalable for large amount of data
 *
 * @technicalDesign
 * A more performant design is to store the tree structure in database in depth-first order.
 * This way we don't need to run through this algorithm every time
 *
 */
export const sortCommentsAsFlattenedTree = (
  comments: CommentBase[],
): unknown[] => {
  // build map per depth then assemble

  // @assumption assume nodes are already sorted by depth. This library requires it for O(n)
  const tree = arrayToTree(orderedComments, {
    id: `_id`,
    parentId: `parentCommentId`,
  });

  const result = tree.reduce<CommentBase[]>((aggregate, current) => {
    depth<TreeItem>({
      tree: current,
      getChildren: (node) => node.children,
      visit: (node) => aggregate.push(node.data as CommentBase),
    });

    return aggregate;
  }, []);

  return result;
};
