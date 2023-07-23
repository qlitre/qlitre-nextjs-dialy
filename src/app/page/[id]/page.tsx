import { Metadata } from "next";
import { getPostList } from 'libs/getPostList';
import { getCategoryList } from 'libs/getCategoryList';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { HomePage } from 'components/pages/HomePage'
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { config } from "settings/siteSettings";

type Params = {
    id: string;
}

export async function generateStaticParams() {
    const { totalCount } = await getPostList();
    type pathObject = { id: string }
    const paths: pathObject[] = []
    const numPages = Math.ceil(totalCount / BLOG_PER_PAGE)
    for (let i = 1; i <= numPages; i++) {
        paths.push({ id: String(i) })
    }
    return paths;
}

export default async function StaticBlogPageID(
    { params, }: { params: Params }) {
    const pageId = Number(params.id);
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const [posts, categories] = await Promise.all([
        getPostList({
            offset: offset,
            limit: BLOG_PER_PAGE,
            fields: config.postListFields
        }),
        getCategoryList()
    ]);
    return (
        <>
            <HomePage posts={posts.contents} categories={categories} totalCount={posts.totalCount} currentPage={pageId} />
        </>
    )
}

export const generateMetadata = async ({
    params,
}: {
    params: Params;
}): Promise<Metadata> => {
    const pageId = Number(params.id);

    const offset = (pageId - 1) * BLOG_PER_PAGE
    const posts = await getPostList({ offset: offset, limit: BLOG_PER_PAGE })
    if (posts.contents.length === 0) {
        return getMetadataWebsite({
            pagePath: `//page/${pageId}`,
            title: "Not Found",
            description: "記事が見つかりませんでした",
            noindex: true,
        });
    }
    return getMetadataWebsite({
        pagePath: `/page/${pageId}`,
        title: `記事一覧${pageId}ページ目`,
        description: `記事一覧${pageId}ページ目`,
    });
}