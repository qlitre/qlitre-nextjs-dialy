import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { Post } from 'types/blog';
import { client } from 'libs/client';
import { useSecondaryColor } from 'libs/useSecondaryColor';
import { SEO } from 'components/SEO';
import { Header } from 'components/Header';
import { MarkdownTemplate } from 'components/MarkdownTemplate';
import { TagLink } from 'components/TagLink';
import { Datetime } from 'components/Datetime';
import { TwitterIntentTweet } from 'components/TwitterIntentTweet';
import { LinkToHome } from 'components/LinkToHome'
import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  Image,
  Flex,
  Icon,
  Button,
  Center,
  Text,
  HStack
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import React from 'react';
import { jstDatetime } from 'utils/utils';
import { config } from 'settings/siteSettings'

type Props = {
  post: Post;
};

export default function Article({ post }: Props) {
  const thumbnailUrl = post.thumbnail ? post.thumbnail.url : undefined;
  return (
    <Box>
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
            <Text as="p" fontSize="sm" color={useSecondaryColor()}>
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
        <MarkdownTemplate source={post.text} mb="16" />
        <Box as="section" marginBottom="16">
          <Flex wrap="wrap" gap="2">
            <Button
              as={TwitterIntentTweet}
              text={post.title}
              url={`${config.siteUrl}/post/${post.id}`}
              hashtags={["qlitredialy"]}
              via={config.social.twitter}
              colorScheme="twitter"
              leftIcon={<Icon as={FaTwitter} />}
            >
              Share
            </Button>
            <a
              href="https://www.buymeacoffee.com/qlitre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                h="10"
                htmlHeight="40"
              />
            </a>

          </Flex>
        </Box>
        <Center>
          <LinkToHome />
        </Center>
      </Container >
    </Box >
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