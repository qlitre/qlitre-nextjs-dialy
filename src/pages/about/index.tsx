
import { SEO } from 'components/molecules/SEO';
import {
    Avatar,
    Box,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Link,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Header } from 'components/organisms/Header';
import { Footer } from 'components/organisms/Footer';
import { LinkToHome } from 'components/atoms/LinkToHome';

const secondaryTextColor = "gray.500";

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
            <Box>
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
                        <Text marginTop="2" fontSize="sm" color={secondaryTextColor} lineHeight="taller">
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
                                href="https://github.com/qlitre"
                                icon={<Icon as={FaGithub} fontSize="3xl" />}
                                size="lg"
                                variant="ghost"
                            />
                            <IconButton
                                aria-label="Twitter"
                                title="Twitter"
                                as={Link}
                                isExternal
                                href="https://twitter.com/kuri_tter"
                                icon={<Icon as={FaTwitter} fontSize="3xl" />}
                                size="lg"
                                variant="ghost"
                                colorScheme="twitter"
                            />
                        </HStack>
                        <Heading as="h1" fontSize="2xl" marginTop="4">
                            このブログについて
                        </Heading>
                        <Text marginTop="2" fontSize="sm" color={secondaryTextColor} lineHeight="taller">
                            Next.js + microCMS + Chakra UIで構成。<br />
                            日常のことを書いています。<br />
                            プログラミングブログも別でやっています。<br />
                        </Text>
                        <Spacer mt="4" />
                        <Product href='https://qlitre-weblog.com/'
                            name='qlitre-weblog' description='プログラミングブログ。Pythonの記事が中心です。' />
                    </Container>
                </Box>
            </Box>
            <Center>
                <LinkToHome />
            </Center>
            <Footer />
        </>
    );
}

type Props = {
    name: string;
    href: string;
    description: string;
}

const Product = ({ href, name, description }: Props) => {
    return (
        <Link
            isExternal
            href={href}
            display="flex"
            gap="3"
            borderRadius="md"
            border="1px solid"
            borderColor="teal.500"
            _hover={{ boxShadow: "md" }}
        >
            <Stack flex="1" padding="4">
                <Box fontWeight="bold">{name}</Box>
                <Box fontSize="sm" color={secondaryTextColor} flex="1">
                    {description}
                </Box>
                <HStack color="teal.500" spacing="1" justifyContent="flex-end">
                    <Box as="span" fontSize="sm">
                        サイトへ
                    </Box>
                    <Icon as={MdArrowForward} />
                </HStack>
            </Stack>
        </Link>
    );
};