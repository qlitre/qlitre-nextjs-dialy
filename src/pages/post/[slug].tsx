import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { Post } from 'types/blog';
import { client } from 'libs/client';
import { useSecondaryColor } from 'libs/useSecondaryColor';
import { SEO } from 'components/molecules/SEO';
import { Header } from 'components/organisms/Header';
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
  HStack
} from '@chakra-ui/react';
import React from 'react';
import { jstDatetime } from 'utils/utils';

type Props = {
  post: Post;
};

export default function Article({ post }: Props) {
  const thumbnailUrl = post.thumbnail ? post.thumbnail.url : undefined;
  const secondaryColor = useSecondaryColor();
  return (
    <>
      <SEO
        type="article"
        pagePath={`/post/${post.id}`}
        publishedTime={jstDatetime(post.publishedAt)}
        tags={post.tag.map((tag) => tag.name)}
        title={post.title}
        description={post.description}
        thumbnailUrl={thumbnailUrl}
      />
      <Header />
      <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
        <Stack spacing="6">
          <Heading as="h1" fontSize="4xl" lineHeight={1.6}>
            {post.title}
          </Heading>
          <HStack spacing="1">
            <Text as="p" fontSize="sm" color={secondaryColor}>
              公開日 :
            </Text>
            <Datetime datetime={post.publishedAt} />
          </HStack>
          <Wrap>
            {post.tag.map(tag => (
              <WrapItem key={tag.id}>
                <TagLink tag={tag} />
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
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

export const getStaticPaths: GetStaticPaths = async () => {
  // limitがデフォルトで10なので、一旦totalCountを取得してから再度リクエストを投げる
  const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
  const totalCount = data.totalCount;
  const allData = await client.getList<Post>({ endpoint: "post", queries: { limit: totalCount } });
  const paths = allData.contents.map((content) => `/post/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  if (!params) throw new Error("Component file name must has params.");
  const slug = params.slug;
  const data = await client.getListDetail<Post>({ endpoint: "post", contentId: slug });

  return {
    props: {
      post: data,
    },
  };
};