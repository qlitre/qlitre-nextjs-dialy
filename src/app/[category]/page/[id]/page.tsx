import { Metadata } from "next";
import { getPostList } from 'libs/getPostList';
import { getCategoryList } from 'libs/getCategoryList';
import { getCategoryDetail } from 'libs/getCategoryDetail';
import { getReferencedCategoryCount } from 'libs/getReferencedCategoryCount';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { HomePage } from "components/pages/HomePage"
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { config } from "settings/siteSettings";

type Params = {
    category: string;
    id: string;
};

export async function generateStaticParams() {
    const categoryCount = await getReferencedCategoryCount();
    type pathObject = {
        category: string;
        id: string;
    }
    const paths: pathObject[] = []
    for (const categoryId in categoryCount) {
        const cnt = categoryCount[categoryId];
        const numPages = Math.ceil(cnt / BLOG_PER_PAGE)
        for (let i = 1; i <= numPages; i++) {
            paths.push({ category: categoryId, id: String(i) })
        }
    }
    return paths;
}

export default async function StaticBlogCategoryPageID(
    { params }: { params: Params; }) {
    const pageId = Number(params.id);
    const categoryId = params.category;
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const [posts, categories, categoryDetail] = await Promise.all([
        await getPostList({
            offset: offset, limit: BLOG_PER_PAGE,
            filters: `category[equals]${categoryId}`,
            fields: config.postListFields
        }),
        await getCategoryList(),
        await getCategoryDetail(categoryId)
    ])

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
    if (posts.contents.length === 0) {
        return getMetadataWebsite({
            pagePath: `/${categoryId}/page/${pageId}`,
            title: "Not Found",
            description: "記事が見つかりませんでした",
            noindex: true,
        });
    }
    const categoryDetail = await getCategoryDetail(categoryId);
    return getMetadataWebsite({
        pagePath: `/${categoryId}/page/${pageId}`,
        title: `category: ${categoryDetail?.name}`,
        description: `"カテゴリー${categoryDetail?.name}"の記事一覧`,
    });
}