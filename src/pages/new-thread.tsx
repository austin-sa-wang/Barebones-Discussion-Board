import { ThreadInput } from '@/types/entities';
import { gql, useMutation } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

const CREATE_THREAD = gql`
  mutation createThread($input: ThreadInput!) {
    createThread(input: $input)
  }
`;

export default function NewThread() {
  const router = useRouter();

  const [title, setTitle] = useState(``);
  const [content, setContent] = useState(``);

  const [createThreadToServer, { loading }] = useMutation<
    any,
    { input: ThreadInput }
  >(CREATE_THREAD, {
    onCompleted() {
      router.push(`/`);
    },
    onError(error) {
      throw error;
    },
  });

  const createThread = () => {
    console.log(`create`, content);
    createThreadToServer({
      variables: {
        input: {
          title,
          content,
        },
      },
    });
  };

  return (
    <div>
      <Head>
        <title>New Thread</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <h1>New Thread</h1>
        <h2 className="mt-2">Title</h2>
        <div>
          <input
            type="text"
            className="border px-4 py-2 min-w-full"
            value={title}
            onChange={(change) => setTitle(change.target.value)}
          ></input>
        </div>
        <div className="mt-2">
          <textarea
            className="border p-4 min-w-full h-48"
            value={content}
            onChange={(change) => setContent(change.target.value)}
          ></textarea>
        </div>

        <button
          onClick={() => createThread()}
          className="p-2 font-semibold text-sm bg-cyan-500 hover:bg-sky-700 text-white rounded-md shadow-sm"
          disabled={loading}
        >
          {loading ? `Saving...` : `Create Thread`}
        </button>
      </main>
    </div>
  );
}
