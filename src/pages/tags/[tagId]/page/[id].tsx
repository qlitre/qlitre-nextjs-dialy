import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { PostTag } from 'types/blog';
import type { Post } from 'types/blog';
import { client } from 'libs/client';
import { Home } from 'components/pages/Home';
import { SEO } from 'components/molecules/SEO';
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { range } from 'utils/utils'

type Props = {
    posts: Post[];
    totalCount: number;
    currentPage: number;
    tag: PostTag;
};

export default function BlogTagId({ posts, totalCount, tag, currentPage }: Props) {
    return (
        <>
            <SEO
                type="website"
                pagePath={`/tags/${tag.id}/page/${currentPage}`}
                title={`tag: ${tag.name}`}
                description={`"${tag.name}" でタグ付けされた記事一覧`}
            />
            <Home posts={posts} totalCount={totalCount} currentPage={currentPage} tag={tag} />
        </>
    );
}

const getAllTagPagePaths = async () => {
    const resTag = await client.getList({
        endpoint: 'tag',
    })

    const paths: string[][] = await Promise.all(
        resTag.contents.map((item: PostTag) => {
            const result = client
                .getList<Post>({
                    endpoint: 'post',
                    queries: {
                        filters: `tag[contains]${item.id}`,
                    },
                })
                .then(({ totalCount }) => {
                    return range(1, Math.ceil(totalCount / BLOG_PER_PAGE)).map(
                        (repo) => `/tags/${item.id}/page/${repo}`
                    )
                })
            return result
        })
    );
    return paths.flat();
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllTagPagePaths()
    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<Props, { tagId: string, id: string }> = async ({ params }) => {
    if (!params) throw new Error("Error Tag ID Not Found");
    const tagId = params.tagId;
    const pageId = Number(params.id);

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (pageId - 1) * BLOG_PER_PAGE,
            limit: BLOG_PER_PAGE, filters: `tag[contains]${tagId}`
        }
    });

    const tag = await client.getListDetail<PostTag>({
        endpoint: 'tag', contentId: tagId
    });

    return {
        props: {
            posts: data.contents,
            totalCount: data.totalCount,
            currentPage: pageId,
            tag: tag
        },
    };
};