import { Metadata } from "next";
import { getPostList } from 'libs/getPostList';
import { getTagDetail } from 'libs/getTagDetail';
import { getCategoryList } from 'libs/getCategoryList';
import { getReferencedTagCount } from 'libs/getReferencedTagCount';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { HomePage } from 'components/pages/HomePage'
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { config } from "settings/siteSettings";

type Params = {
    tagId: string;
    id: string;
}

export async function generateStaticParams() {
    const tagCount = await getReferencedTagCount();
    type pathObject = { tagId: string, id: string }
    const paths: pathObject[] = []
    for (const tagId in tagCount) {
        const cnt = tagCount[tagId];
        const numPages = Math.ceil(cnt / BLOG_PER_PAGE)
        for (let i = 1; i <= numPages; i++) {
            paths.push({ tagId: tagId, id: String(i) })
        }
    }
    return paths;
}

export default async function StaticBlogTagPageID({
    params, }: { params: Params; }) {
    const pageId = Number(params.id);
    const tagId = params.tagId;
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const [posts, categories, tagDetail] = await Promise.all([
        await getPostList({
            offset: offset,
            limit: BLOG_PER_PAGE,
            filters: `tag[contains]${tagId}`,
            fields: config.postListFields
        }),
        await getCategoryList(),
        await getTagDetail(tagId)
    ])

    return (
        <>
            <HomePage posts={posts.contents} totalCount={posts.totalCount} categories={categories} currentPage={pageId} tag={tagDetail} />
        </>
    )
}

export const generateMetadata = async ({
    params,
}: {
    params: Params;
}): Promise<Metadata> => {

    const pageId = Number(params.id);
    const tagId = params.tagId;
    const offset = (pageId - 1) * BLOG_PER_PAGE
    const posts = await getPostList({ offset: offset, limit: BLOG_PER_PAGE, filters: `tag[contains]${tagId}` })
    if (posts.contents.length === 0) {
        return getMetadataWebsite({
            pagePath: `tags/${tagId}/page/${pageId}`,
            title: "Not Found",
            description: "記事が見つかりませんでした",
            noindex: true,
        });
    }
    const tagDetail = await getTagDetail(tagId);
    return getMetadataWebsite({
        pagePath: `/${tagId}/page/${pageId}`,
        title: `tag: ${tagDetail?.name}`,
        description: `"${tagDetail?.name}" でタグ付けされた記事一覧`,
    });
}