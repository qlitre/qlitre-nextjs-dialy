import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';
import type { Post } from 'types/blog';
import type { PostCategory } from 'types/blog';
import { client } from 'libs/client';
import { getCategoryContents } from 'libs/getCategoryContents';
import { SEO } from 'components/molecules/SEO';
import { Home } from 'components/pages/Home';
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { config } from 'settings/siteSettings';

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList({ endpoint: "post", queries: { limit: BLOG_PER_PAGE } });
  const categories = await getCategoryContents()
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      categories: categories
    },
  };
};

type Props = {
  posts: Post[];
  totalCount: number;
  categories: PostCategory[];
};

const HomePage: NextPage<Props> = ({ posts, totalCount, categories }) => {
  return (
    <>
      <SEO type="website" pagePath="/" title="Home"
        description={config.siteDescription} />
      <Home posts={posts} totalCount={totalCount} categories={categories} />
    </>
  )
}

export default HomePage