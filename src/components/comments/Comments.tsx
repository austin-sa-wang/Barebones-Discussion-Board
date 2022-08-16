import { CommentsData } from '@/types/entities';
import { useQuery, gql } from '@apollo/client';
import { isNil } from 'ramda';
import { CommentsView } from './CommentsView';

const QUERY = gql`
  query Comments($threadId: ID!) {
    comments(threadId: $threadId) {
      _id
      content
      parentCommentId
      depth
    }
  }
`;

interface Props {
  threadId: string;
}

export default function Comments({ threadId }: Props) {
  console.log(`th`, threadId);
  const { data, loading, error } = useQuery<CommentsData>(QUERY, {
    variables: {
      threadId,
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong {JSON.stringify(error)}</h2>;
  }

  return (
    <>
      {isNil(data) || isNil(data.comments) ? null : (
        <CommentsView comments={data.comments} />
      )}
    </>
  );
}
