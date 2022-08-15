import { useQuery, gql } from '@apollo/client';
import { isNil } from 'ramda';
import styles from '../styles/Home.module.css';

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
    <div className={styles.grid}>
      {isNil(data) || isNil(data.threads)
        ? null
        : data.threads.map((thread) => (
            <div key={thread._id} className={styles.card}>
              <h3>{thread.title}</h3>
              <p>{thread._id}</p>
            </div>
          ))}
    </div>
  );
}
