import { getPostList } from 'libs/getPostList';
import { getCategoryList } from 'libs/getCategoryList';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { HomePage } from 'components/pages/HomePage';
import { config } from 'settings/siteSettings';



export default async function Home() {
  const posts = await getPostList();
  if (!posts.contents || posts.contents.length === 0) {
    return <h1>No contents</h1>;
  }
  const totalCount = posts.totalCount;
  const categories = await getCategoryList();

  return (
    <>
      <HomePage posts={posts.contents} categories={categories} totalCount={totalCount} currentPage={1}></HomePage>
    </>
  )
}

export const metadata = getMetadataWebsite({
  pagePath: "/",
  title: "Home",
  description: `${config.siteDescription}`,
});