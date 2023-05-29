import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloProvider } from "@apollo/client";

import { SaleorAuthProvider, useAuthChange, useSaleorAuthClient } from "@saleor/auth-sdk/react";
import { useAuthenticatedApolloClient } from "@saleor/auth-sdk/react/apollo";

const SaleorURL = process.env.NEXT_PUBLIC_SALEOR_URL!;

export default function App({ Component, pageProps }: AppProps) {
  const saleorAuth = useSaleorAuthClient({ saleorApiUrl: SaleorURL });

  const { apolloClient, reset, refetch } = useAuthenticatedApolloClient({
    uri: SaleorURL,
    fetchWithAuth: saleorAuth.saleorAuthClient.fetchWithAuth,
  });

  useAuthChange({
    saleorApiUrl: SaleorURL,
    onSignedOut: () => reset(),
    onSignedIn: () => refetch(),
  });

  return (
    <SaleorAuthProvider {...saleorAuth}>
      <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
    </SaleorAuthProvider>
  );
}
