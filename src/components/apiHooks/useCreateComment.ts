import { CommentInput } from '@/types/entities';
import { useUserContext } from '@/UserContext';
import { gql, useMutation } from '@apollo/client';

const CREATE_COMMENT = gql`
  mutation createComment(
    $threadId: ID!
    $content: String!
    $parentCommentId: ID
  ) {
    createComment(
      threadId: $threadId
      content: $content
      parentCommentId: $parentCommentId
    )
  }
`;

export const useCreateComment = () => {
  const [{ isConnected, connectedAccount }] = useUserContext();

  if (!isConnected) {
    throw new Error(`not connected`);
  }

  const [createComment] = useMutation<any, CommentInput>(CREATE_COMMENT, {
    onError(error) {
      throw error;
    },
  });

  return [createComment];
};
