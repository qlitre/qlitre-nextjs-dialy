import { SEO } from 'components/molecules/SEO';
import { Center } from "@chakra-ui/react";
import { LinkToHome } from 'components/atoms/LinkToHome';
import { Header } from 'components/organisms/Header';
import { About } from 'components/organisms/About';
import { Footer } from 'components/organisms/Footer';

export default function AboutPage() {
    return (
        <>
            <SEO
                type="website"
                pagePath={`/about`}
                title={`ABOUT`}
                description={`QlitreのABOUTページ`}
            />
            <Header />
            <About />
            <Center>
                <LinkToHome />
            </Center>
            <Footer />
        </>
    );
}
