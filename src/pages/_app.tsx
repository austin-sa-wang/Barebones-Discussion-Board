import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { apolloClient } from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { MetamaskConnect } from '@/components/MetamaskConnect';
import { UserContextProvider } from '@/UserContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <ApolloProvider client={apolloClient}>
          <div>
            <MetamaskConnect />
          </div>
          <Component {...pageProps} />
        </ApolloProvider>
      </UserContextProvider>
    </>
  );
}
