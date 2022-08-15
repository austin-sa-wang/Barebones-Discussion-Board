import Head from 'next/head';

import { useState } from 'react';

export default function NewThread() {
  const [textAreaValue, setTextAreaValue] = useState(``);

  const createThread = () => {
    console.log(`create`, textAreaValue);
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

      <main className="container mx-auto px-4 py-16">
        <h1>New Thread</h1>
        <textarea
          className="border p-6"
          value={textAreaValue}
          onChange={(change) => setTextAreaValue(change.target.value)}
        ></textarea>
        <button
          onClick={() => createThread()}
          className="p-2 font-semibold text-sm bg-cyan-500 hover:bg-sky-700 text-white rounded-md shadow-sm"
        >
          Create Thread
        </button>
      </main>
    </div>
  );
}
