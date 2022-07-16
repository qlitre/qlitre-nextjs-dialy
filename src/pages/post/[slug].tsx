import { GetStaticPaths, GetStaticProps, } from "next";
import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Header } from "../../components/Header";
import { MarkdownTemplate } from "../../components/MarkdownTemplate";
import { client } from "../../libs/client";
import type { Post } from "../../types/blog";


type Props = {
  post: Post;
};


export default function Article({ post }: Props) {
  return (
    <Box>
      <Header />
      <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
        <Stack spacing="8">
          <Heading as="h1" fontSize="2xl" lineHeight={1.6}>
            {post.title}
          </Heading>
        </Stack>
        <Divider marginY="8" />
        <MarkdownTemplate source={post.text} mb="16" />
      </Container >
    </Box >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getList<Post>({ endpoint: "post" });

  const paths = data.contents.map((content) => `/post/${content.id}`);
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