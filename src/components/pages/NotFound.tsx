import { Center, Container, Heading } from '@chakra-ui/react';
import { LinkToHome } from 'components/atoms/LinkToHome';
import { Header } from 'components/organisms/Header';
import { Footer } from 'components/organisms/Footer';

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