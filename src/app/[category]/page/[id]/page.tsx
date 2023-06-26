import { getPostList } from 'libs/getPostList';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { HomePage } from 'components/pages/HomePage'
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { getCategoryList } from 'libs/getCategoryList';
import { getReferencedCategoryCount } from 'libs/getReferencedCategoryCount';
import { Metadata } from "next";

type Params = {
    category: string;
    id: string;
};

export async function generateStaticParams() {
    const categoryCount = await getReferencedCategoryCount();
    const paths: string[] = []
    for (const categoryId in categoryCount) {
        const cnt = categoryCount[categoryId];
        const numPages = Math.ceil(cnt / BLOG_PER_PAGE)
        for (let i = 1; i <= numPages; i++) {
            paths.push(`${categoryId}/page/${i}`)
        }
    }
    return paths;
}

export default async function StaticBlogCategoryPageID(
    { params }: { params: Params; }) {
    const pageId = Number(params.id);
    const categoryId = params.category;
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const posts = await getPostList({ offset: offset, limit: BLOG_PER_PAGE, filters: `category[equals]${categoryId}` })
    const categories = await getCategoryList()
    const categoryDetail = categories.find((c) => c.id === categoryId);

    return (
        <>
            <HomePage posts={posts.contents} categories={categories} category={categoryDetail} totalCount={posts.totalCount} currentPage={pageId} />
        </>
    )
}

export const generateMetadata = async ({
    params,
}: {
    params: Params;
}): Promise<Metadata> => {
    const pageId = Number(params.id);
    const categoryId = params.category;
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const posts = await getPostList({ offset: offset, limit: BLOG_PER_PAGE, filters: `category[equals]${categoryId}` })
    const categories = await getCategoryList()
    if (posts.contents.length === 0) {
        return getMetadataWebsite({
            pagePath: `/${categoryId}/page/${pageId}`,
            title: "Not Found",
            description: "記事が見つかりませんでした",
            noindex: true,
        });
    }
    const categoryDetail = categories.find((c) => c.id === categoryId);
    return getMetadataWebsite({
        pagePath: `/${categoryId}/page/${pageId}`,
        title: `category: ${categoryDetail?.name}`,
        description: `"カテゴリー${categoryDetail?.name}"の記事一覧`,
    });
}