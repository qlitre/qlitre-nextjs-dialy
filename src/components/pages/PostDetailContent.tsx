import type { Post } from 'types/blog';
import { useSecondaryColor } from 'libs/useSecondaryColor';
import { Header } from 'components/organisms/Header';
import { CategoryLink } from 'components/atoms/CategoryLink';
import { TagLink } from 'components/atoms/TagLink';
import { MarkdownTemplate } from 'components/organisms/MarkdownTemplate';
import { RepeatedBody } from 'components/organisms/RepeatedBody';
import { Footer } from 'components/organisms/Footer';
import { Datetime } from 'components/atoms/Datetime';
import { TwitterShare } from 'components/atoms/TwitterShare'
import { BuyMeACoffeeLink } from 'components/atoms/BuyMeACoffeeLink'
import { LinkToHome } from 'components/atoms/LinkToHome'
import {
    Box,
    Container,
    Divider,
    Heading,
    Stack,
    Wrap,
    WrapItem,
    Flex,
    Center,
    Text,
    HStack,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
    post: Post;
};

export const PostDetailContent = ({ post }: Props) => {
    const secondaryColor = useSecondaryColor();
    return (
        <>
            <Header />
            <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
                <Box>
                    <Stack spacing={4}>
                        <Heading as="h1" fontSize="3xl" lineHeight={1.6}>
                            {post.title}
                        </Heading>
                        <HStack spacing="1">
                            <Text as="p" fontSize="sm" color={secondaryColor}>
                                公開日 :
                            </Text>
                            <Datetime datetime={post.publishedAt} />
                        </HStack>
                        <Wrap>
                            <WrapItem>
                                <CategoryLink category={post.category} />
                            </WrapItem>
                            {post.tag.map(tag => (
                                <WrapItem key={tag.id}>
                                    <TagLink tag={tag} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Stack>
                </Box>
                <Divider marginY="8" />

                {post.useRepeatedBody ? <RepeatedBody repeatedBody={post.repeatedBody} /> : <MarkdownTemplate source={post.text} mb="16" />}

                <Box as="section" marginBottom="16">
                    <Flex wrap="wrap" gap="2">
                        <TwitterShare title={post.title} slug={post.id} />
                        <BuyMeACoffeeLink />
                    </Flex>
                </Box>
                <Center>
                    <LinkToHome />
                </Center>
            </Container >
            <Footer />
        </ >
    )
}