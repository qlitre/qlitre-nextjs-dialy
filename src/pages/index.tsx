import type { NextPage } from 'next'
import type { GetStaticProps } from 'next';
import type { Post } from 'types/blog'
import { client } from 'libs/client';
import { SEO } from 'components/SEO';
import { Home } from 'components/Home';
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

const HomePage: NextPage<Props> = ({ posts, totalCount }) => {
  return (
    <>
      <SEO type="website" pagePath="/" title="Home" description="くりったーの日記サイト" />
      <Home posts={posts} totalCount={totalCount} />
    </>
  )
}

export default HomePage