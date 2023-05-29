import { Inter } from 'next/font/google'

import { useSaleorAuthContext, useSaleorExternalAuth } from '@saleor/auth-sdk/react'
import { ExternalProvider } from '@saleor/auth-sdk';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

const inter = Inter({ subsets: ['latin'] })

const SaleorURL = process.env.NEXT_PUBLIC_SALEOR_URL!;

export default function Home() {
  const { loading: isLoading, error, data } = useQuery(gql`
  query CurrentUser {
  me {
    id
    email
    firstName
    lastName
  }
}`);

  const { authURL, loading } = useSaleorExternalAuth({
    saleorURL: SaleorURL,
    provider: ExternalProvider.OpenIDConnect,
    redirectURL: 'http://localhost:5375/api/auth/callback',
  });

  const { signOut } = useSaleorAuthContext();

  if (loading || isLoading) {
    return <div>Loading...</div>;
  } else if (data && data.me) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {JSON.stringify(data)}
        <button onClick={() => signOut()}>
          Logout
        </button>
      </main>
    )
  } else if (authURL) {
      return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Link href={authURL}>
          Login
        </Link> 
      </main>
      )
  } else {
    return (
    <div>Something went wrong</div>
    )
  }
}
