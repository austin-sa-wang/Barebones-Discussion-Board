import Head from 'next/head';
import Image from 'next/image';

import ClientOnly from '@/components/utils/ClientOnly';
import Threads from '@/components/Threads';

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

      <main className='container mx-auto px-4 py-16'>
        <ClientOnly>
          <Threads />
        </ClientOnly>
      </main>
    </div>
  );
}
