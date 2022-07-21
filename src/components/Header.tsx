import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Container,
    Heading,
    Link,
    HStack,
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FC } from 'react';
import { config } from 'settings/siteSettings'

export const Header: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Container maxW="container.lg">
                <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                    <NextLink href="/" passHref>
                        <Heading as='h1' fontSize="2xl" cursor="pointer" color={useColorModeValue('gray.600', 'white')}>
                            {config.siteTitle}
                        </Heading>
                    </NextLink>
                    <HStack as="nav" spacing="3">
                        <Link
                            isExternal
                            href={config.repository}
                            display="flex"
                            alignItems="center"
                            gap="2"
                            fontWeight="bold"
                        >
                            GitHub
                        </Link>
                        <Button size='lg' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}