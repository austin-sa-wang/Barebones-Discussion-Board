import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { apolloClient } from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
