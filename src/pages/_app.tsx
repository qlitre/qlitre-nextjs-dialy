import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useGoogleAnalytics } from "libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
