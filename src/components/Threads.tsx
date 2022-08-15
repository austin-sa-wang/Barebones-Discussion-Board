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

interface Thread {
  _id: string;
  title: string;
}

interface ThreadsData {
  threads: Thread[];
}

export default function Threads() {
  const { data, loading, error } = useQuery<ThreadsData>(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold underline">AHAHAHJAKLKAJSDJF</h2>
      {isNil(data) || isNil(data.threads)
        ? null
        : data.threads.map((thread) => (
            <div key={thread._id}>
              <h3>{thread.title}</h3>
              <p>{thread._id}</p>
            </div>
          ))}
    </div>
  );
}
