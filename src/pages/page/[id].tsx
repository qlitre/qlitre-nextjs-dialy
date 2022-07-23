import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { Post } from "types/blog";
import { client } from 'libs/client';
import { Home } from 'components/Home'
import { SEO } from 'components/SEO';
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { range } from 'utils/utils'

type Props = {
    posts: Post[];
    totalCount: number;
    currentPage: number;
};


export default function BlogPageId({ posts, totalCount, currentPage }: Props) {
    return (
        <>
            <SEO
                type="website"
                pagePath={`/page/${currentPage}`}
                title={`ページ: ${currentPage}`}
                description={`${currentPage}ページ目の記事一覧`}
            />
            <Home posts={posts} totalCount={totalCount} currentPage={currentPage} />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const repos = await client.getList<Post>({ endpoint: "post" });
    const paths = range(1, Math.ceil(repos.totalCount / BLOG_PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
    if (!params) throw new Error("Component file name must has params.");
    const pageId = Number(params.id);

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (Number(pageId) - 1) * BLOG_PER_PAGE,
            limit: BLOG_PER_PAGE
        }
    });

    return {
        props: {
            posts: data.contents,
            totalCount: data.totalCount,
            currentPage: pageId
        },
    };
};