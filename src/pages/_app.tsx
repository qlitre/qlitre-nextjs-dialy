import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider, SlideFade } from '@chakra-ui/react';
import { useGoogleAnalytics } from "libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  const router = useRouter();
  return (
    <ChakraProvider>
      <SlideFade in={true}>
        <Component {...pageProps} />
      </SlideFade>
    </ChakraProvider>
  )
}

export default MyApp
