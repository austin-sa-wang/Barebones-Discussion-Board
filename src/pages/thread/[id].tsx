import { BasicLinkButton } from '@/components/BasicButton';
import Comments from '@/components/Comments';
import { CommentInput, Entity, ThreadData } from '@/types/entities';
import { useQuery, gql, useMutation } from '@apollo/client';
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import { useState } from 'react';

const QUERY = gql`
  query Thread($id: ID!) {
    thread(id: $id) {
      _id
      title
      content
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment(
    $parentEntity: Entity!
    $parentId: ID!
    $content: String!
  ) {
    createComment(
      parentEntity: $parentEntity
      parentId: $parentId
      content: $content
    )
  }
`;

export default function Threads() {
  const router = useRouter();

  const { id } = router.query;

  let shouldSkip = false;
  if (typeof id !== `string`) {
    shouldSkip = true;
  }

  const { data, loading, error } = useQuery<ThreadData>(QUERY, {
    variables: {
      id,
    },
    fetchPolicy: `network-only`,
    skip: shouldSkip,
  });

  const [commentContent, setCommentContent] = useState(``);
  const [createCommentToServer] = useMutation<any, CommentInput>(
    CREATE_COMMENT,
    {
      onError(error) {
        throw error;
      },
    },
  );

  if (error) {
    return <h2>Something went wrong {JSON.stringify(error)}</h2>;
  }

  const createComment = () => {
    createCommentToServer({
      variables: {
        parentEntity: Entity.Thread,
        parentId: id as unknown as string,
        content: commentContent,
      },
      refetchQueries: [`Comments`],
    });
  };

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
            <div>
              <p className="p-2">{data.thread.title}</p>
              <p className="border p-4 min-w-full h-48">
                {data.thread.content}
              </p>
            </div>
          )}
        </div>
        <div className="mt-2">
          <h1>Comments</h1>
          <Comments />
          <textarea
            className="border p-4 min-w-full h-24"
            value={commentContent}
            onChange={(change) => setCommentContent(change.target.value)}
          ></textarea>
          <button
            onClick={() => createComment()}
            className="p-2 font-semibold text-sm bg-cyan-500 hover:bg-sky-700 text-white rounded-md shadow-sm"
            disabled={loading}
          >
            {loading ? `Saving...` : `Add Comment`}
          </button>
        </div>
      </div>
    </>
  );
}
