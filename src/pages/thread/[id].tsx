import { BasicLinkButton } from '@/components/BasicButton';
import { ThreadData } from '@/types/entities';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';

const QUERY = gql`
  query Thread($id: ID!) {
    thread(id: $id) {
      _id
      title
      content
    }
  }
`;

export default function Threads() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<ThreadData>(QUERY, {
    variables: {
      id,
    },
    fetchPolicy: `network-only`,
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong {JSON.stringify(error)}</h2>;
  }

  return (
    <>
      <BasicLinkButton
        className="mt-2 cursor-pointer p-2 font-semibold text-sm bg-gray-500 hover:bg-gray-700 text-white rounded-md shadow-sm w-fit"
        href="/"
      >
        Back to Threads
      </BasicLinkButton>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="mt-2">
          {isNil(data) || isNil(data.thread) ? null : (
            <div className="divide-y">
              <p>{data.thread.title}</p>
              <p>{data.thread.content}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
