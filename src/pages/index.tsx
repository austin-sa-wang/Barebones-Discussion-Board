import Head from 'next/head';

import ClientOnly from '@/components/utils/ClientOnly';
import Threads from '@/components/Threads';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <ClientOnly>
          <Threads />
        </ClientOnly>
        <Link href="/new-thread">
          <span className="cursor-pointer p-6 font-semibold text-md bg-cyan-500 hover:bg-sky-700 text-white rounded-full shadow-sm">
            + New Thread
          </span>
        </Link>
      </main>
    </div>
  );
}
