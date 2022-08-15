import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { useGoogleAnalytics } from "libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  const router = useRouter();
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
