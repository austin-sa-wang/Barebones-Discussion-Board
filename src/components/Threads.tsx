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
    return <h2>Something went wrong { JSON.stringify(error) }</h2>;
  }

  return (
    <div className='container mx-auto max-w-2xl border'>
      <div className='grid grid-cols-1 divide-y'>
        {isNil(data) || isNil(data.threads)
          ? null
          : data.threads.map((thread) => (
              <div key={thread._id} className='py-4 px-4 hover:shadow-inner'>
                <h3>{thread.title}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}
