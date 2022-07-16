import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { client } from '../libs/client';
import Link from "next/link";
import { Post } from '../types/blog'
import { Header } from '../components/Header'
import { FC } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  Spacer,
  Stack
} from "@chakra-ui/react";
import { Datetime } from '../components/Datetime'
import { Pagination } from '../components/Pagination';

export const getStaticProps = async () => {
  const data = await client.getList({ endpoint: "post" });
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount
    },
  };
};

type Props = {
  posts: Post[];
  totalCount: number
};



const Home: NextPage<Props> = ({ posts, totalCount }) => {

  return (
    <Box>
      <Header />
      <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
        <Heading as="h1" marginBottom="8" fontSize="2xl">
          Blog
        </Heading>
        <Stack>
          {posts.map(post => (
            <>
              <Box>
                <Link href={`/post/${post.id}`}>
                  <Heading
                    as="h2"
                    fontSize="3xl"
                    lineHeight={1.6}
                    marginTop="4"
                    flex={1}
                    cursor="pointer"
                  >
                    {post.title}
                  </Heading>
                </Link>
                <Datetime datetime={post.createdAt} format="yyyy-MM-dd" />
                <Text mt="2" color="gray.600" fontSize="md">{post.description}</Text>
                <Link href={`/post/${post.id}`}>
                  <Button
                    colorScheme='teal'
                    variant='outline'
                    size="sm"
                    mt="8"
                  >
                    続きを読む
                  </Button>
                </Link>
              </Box>
              <Box>
                <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
              </Box>
            </>
          ))}
        </Stack>
        <Pagination totalCount={totalCount} />
      </Container>
    </Box>

  )
}

export default Home