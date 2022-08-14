import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from 'libs/gtag';
import { ColorModeScript } from '@chakra-ui/react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-7543031846020039"
                        crossOrigin="anonymous"
                    />
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
                        }}
                    />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}