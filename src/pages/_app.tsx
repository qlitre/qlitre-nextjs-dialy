import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider, Fade } from '@chakra-ui/react';
import { useGoogleAnalytics } from "libs/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();
  const router = useRouter();
  return (
    <ChakraProvider>
      <Fade in={true}>
        <Component {...pageProps} />
      </Fade>
    </ChakraProvider>
  )
}

export default MyApp
