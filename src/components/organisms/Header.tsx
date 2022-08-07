import NextLink from "next/link";
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode,
    Container,
    Heading,
    Link,
    HStack,
    Icon,
    IconButton,
    useBreakpointValue
} from '@chakra-ui/react';
import { config } from 'settings/siteSettings';

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const screenIsWider = useBreakpointValue([false, false, true], "sm");
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
                        <Button size='lg' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {screenIsWider ? <NavLinks /> : <CollapsedNavLinks />}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}

const NavLinks = () => {
    return (
        <>
            <Link
                href="/about"
                display="flex"
                alignItems="center"
                gap="2"
                fontWeight="bold"
            >
                About
            </Link>
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

        </>
    );
};

const CollapsedNavLinks = () => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="ナビゲーションリンクを開閉する"
                icon={<Icon as={HamburgerIcon} />}
                variant="outline"
            />
            <MenuList>
                <MenuItem as="a" href="/about">
                    About
                </MenuItem>
                <MenuItem as="a" target="_blank" rel="noreferer" href={config.repository}>
                    GitHub
                </MenuItem>
            </MenuList>
        </Menu>
    );
};