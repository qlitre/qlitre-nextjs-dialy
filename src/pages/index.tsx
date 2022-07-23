import type { NextPage } from 'next'
import type { GetStaticProps } from 'next';
import type { Post } from 'types/blog'
import { client } from 'libs/client';
import { SEO } from 'components/SEO';
import { Header } from 'components/Header';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { PostList } from 'components/PostList';
import { Pagination } from 'components/Pagination';
import {
  Box,
  Container,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList({ endpoint: "post", queries: { limit: BLOG_PER_PAGE } });
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount
    },
  };
};

type Props = {
  posts: Post[];
  totalCount: number;
};

const Home: NextPage<Props> = ({ posts, totalCount }) => {
  return (
    <Box>
      <SEO type="website" pagePath="/" title="Home" description="くりったーの日記サイト" />
      <Header />
      <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
        <Breadcrumbs />
        <PostList posts={posts} />
        <Pagination totalCount={totalCount} />
      </Container>
    </Box>
  )
}

export default Home