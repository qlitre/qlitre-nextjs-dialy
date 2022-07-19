import type { NextPage } from 'next'
import { client } from 'libs/client';
import { Post } from 'types/blog'
import { Header } from 'components/Header'
import {
  Box,
  Container,
} from "@chakra-ui/react";
import { PostList } from 'components/PostList'
import { Pagination } from 'components/Pagination';
import { Breadcrumbs } from 'components/Breadcrumbs'
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { SEO } from 'components/SEO';

export const getStaticProps = async () => {
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
  totalCount: number
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