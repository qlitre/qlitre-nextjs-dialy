import { client } from "libs/client";
import type { Post } from "types/blog";

import { GetStaticPaths, GetStaticProps, } from "next";
import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import React from "react";
import { Header } from "components/Header";
import { MarkdownTemplate } from "components/MarkdownTemplate";
import { TagLink } from "components/TagLink";
import { Datetime } from "components/Datetime";

type Props = {
  post: Post;
};

export default function Article({ post }: Props) {
  return (
    <Box>
      <Header />
      <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
        <Stack spacing="8">
          <Heading as="h1" fontSize="4xl" lineHeight={1.6}>
            {post.title}
          </Heading>
          <Datetime datetime={post.publishedAt} format="yyyy-MM-dd" display="block" fontSize="xl" color="gray.500" mt="2" />
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
      </Container >
    </Box >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // limitがデフォルトで10なので、一旦totalCountを取得してから再度リクエストを投げる
  const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
  const totalCount = data.totalCount
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