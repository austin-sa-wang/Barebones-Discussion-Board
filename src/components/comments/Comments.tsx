import { CommentsData } from '@/types/entities';
import { useQuery, gql } from '@apollo/client';
import { isNil } from 'ramda';

const QUERY = gql`
  query Comments($threadId: ID!) {
    comments(threadId: $threadId) {
      _id
      content
      parentCommentId
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
    <div className="container mx-auto border">
      <div className="grid grid-cols-1 divide-y">
        {isNil(data) || isNil(data.comments)
          ? null
          : data.comments.map((comment) => (
              <div
                key={comment._id}
                className="py-4 px-4 hover:shadow-inner cursor-pointer"
              >
                <h3>{comment.content}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}
