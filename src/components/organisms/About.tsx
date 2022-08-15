import {
    Avatar,
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Link,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Product } from "components/atoms/Product";
import { config } from 'settings/siteSettings'


export const About = () => {

    return (
        <Box as="main" lineHeight="1.8" letterSpacing="wider">
            <Flex
                justifyContent="center"
                paddingTop="4"
                bgGradient="linear(to-br, cyan.400, teal.400)"
            >
                <Avatar
                    name="Qlitre"
                    src="/myprof.jpeg"
                    showBorder
                    borderWidth="4px"
                    transform="translateY(50%)"
                    width={["40", "48", "56"]}
                    height={["40", "48", "56"]}
                />
            </Flex>
            <Container paddingTop={["32", "36", "40"]} paddingBottom="12">
                <Heading as="h1" fontSize="2xl">
                    Qlitre
                </Heading>
                <Text marginTop="2" fontSize="sm" color="gray.500" lineHeight="taller">
                    株式会社で働いています。<br />
                    趣味、プログラミング、読書、音楽を聴く。<br />
                    好きなアーティスト、柴田聡子さん。<br />
                </Text>
                <HStack marginTop="8">
                    <IconButton
                        aria-label="GitHub"
                        title="GitHub"
                        as={Link}
                        isExternal
                        href={config.github}
                        icon={<Icon as={FaGithub} fontSize="3xl" />}
                        size="lg"
                        variant="ghost"
                    />
                    <IconButton
                        aria-label="Twitter"
                        title="Twitter"
                        as={Link}
                        isExternal
                        href={config.twitterTop}
                        icon={<Icon as={FaTwitter} fontSize="3xl" />}
                        size="lg"
                        variant="ghost"
                        colorScheme="twitter"
                    />
                </HStack>
                <Heading as="h1" fontSize="2xl" marginTop="4">
                    このサイトについて
                </Heading>
                <Text marginTop="2" fontSize="sm" color="gray.500" lineHeight="taller">
                    Next.js + microCMS + Chakra UIで自作した日記サイトです。<br />
                    日常のことを書いています。<br />
                    別でプログラミングブログもやっています。<br />
                </Text>
                <Spacer mt="16" />
                <Product href='https://qlitre-weblog.com/'
                    name='qlitre-weblog' description='プログラミングブログ。Pythonの記事が中心です。' />
            </Container>
        </Box>
    );
}