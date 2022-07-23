import { Center, Container, Heading } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { LinkToHome } from 'components/LinkToHome';
import { Footer } from 'components/Footer';

export const NotFound = () => {
    return (
        <>
            <Header />
            <Container maxW="container.lg">
                <Center py="16">
                    <Heading as="h1" textAlign="center">
                        ページが見つかりませんでした
                    </Heading>
                </Center>
                <Center marginTop="8">
                    <LinkToHome />
                </Center>
            </Container>
            <Footer />
        </>
    );
};