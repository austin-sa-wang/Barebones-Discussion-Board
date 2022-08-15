import { ThreadsData } from '@/types/entities';
import { useQuery, gql } from '@apollo/client';
import { isNil } from 'ramda';

const QUERY = gql`
  query Threads {
    threads {
      _id
      title
    }
  }
`;

export default function Threads() {
  const { data, loading, error } = useQuery<ThreadsData>(QUERY, {
    fetchPolicy: `cache-and-network`,
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
        {isNil(data) || isNil(data.threads)
          ? null
          : data.threads.map((thread) => (
              <div
                key={thread._id}
                className="py-4 px-4 hover:shadow-inner cursor-pointer"
              >
                <h3>{thread.title}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}
