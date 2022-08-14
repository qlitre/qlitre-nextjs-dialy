import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { Post } from "types/blog";
import type { PostCategory } from 'types/blog';
import { client } from 'libs/client';
import { SEO } from 'components/molecules/SEO';
import { Home } from 'components/pages/Home'
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { range } from 'utils/utils'
import { getCategoryContents } from 'libs/getCategoryContents'

type Props = {
    posts: Post[];
    categories: PostCategory[];
    totalCount: number;
    currentPage: number;
};


export default function BlogPageId({ posts, categories, totalCount, currentPage }: Props) {
    return (
        <>
            <SEO
                type="website"
                pagePath={`/page/${currentPage}`}
                title={`ページ: ${currentPage}`}
                description={`${currentPage}ページ目の記事一覧`}
            />
            <Home posts={posts} categories={categories} totalCount={totalCount} currentPage={currentPage} />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const repos = await client.getList<Post>({ endpoint: "post" });
    const paths = range(1, Math.ceil(repos.totalCount / BLOG_PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    if (!params) throw new Error("Component file name must has params.");
    const pageId = Number(params.id);

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (Number(pageId) - 1) * BLOG_PER_PAGE,
            limit: BLOG_PER_PAGE
        }
    });

    const categories = await getCategoryContents()

    return {
        props: {
            posts: data.contents,
            categories: categories,
            totalCount: data.totalCount,
            currentPage: pageId
        },
    };
};