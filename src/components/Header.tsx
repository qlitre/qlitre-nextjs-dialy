import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Container,
    Heading
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FC } from 'react';

export const Header: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Container maxW="container.lg">
                <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
                    <NextLink href="/" passHref>
                        <Heading as='h1' fontSize="2xl" cursor="pointer">
                            Qlitre&rsquo;s Dialy
                        </Heading>
                    </NextLink>
                    <Button size='lg' onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
}