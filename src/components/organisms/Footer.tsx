import {
    Container,
    Flex,
    Text,
    Link,
} from '@chakra-ui/react';
import { useSecondaryColor } from "libs/useSecondaryColor";

export const Footer = () => {
    return (
        <>
            <Container maxW="container.lg">
                <Flex
                    as="footer"
                    py="8"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="4">
                    <Text color={useSecondaryColor()} fontSize="sm">
                        このサイトは{" "}
                        <Link
                            href="https://policies.google.com/technologies/partner-sites?hl=ja"
                            isExternal>
                            {" "}
                            Google Analytics
                        </Link>{" "}
                        を使用しています
                    </Text>
                    <Text color={useSecondaryColor()} as="small">
                        &copy;2022{" "}
                        <Link isExternal href="https://twitter.com/kuri_tter">
                            Qlitre
                        </Link>
                    </Text>
                </Flex>
            </Container>
        </>
    );
};