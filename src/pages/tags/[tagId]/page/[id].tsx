import { Pagination } from 'components/Pagination';
import { client } from 'libs/client';
import { GetStaticPaths, GetStaticProps, } from "next";
import type { Post } from "types/blog";
import { Header } from 'components/Header'
import { PostList } from 'components/PostList';
import { Breadcrumbs } from 'components/Breadcrumbs'
import type { PostTag } from 'types/blog';
import {
    Box,
    Container,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { SEO } from 'components/SEO'

type Props = {
    posts: Post[]
    totalCount: number
    currentPage: number
    tag: PostTag
};


export default function TagId({ posts, totalCount, tag, currentPage }: Props) {
    return (
        <Box>
            <SEO
                type="website"
                pagePath={`/tags/${tag.id}/page/${currentPage}`}
                title={`tag: ${tag.name}`}
                description={`"${tag.name}" でタグ付けされた記事一覧`}
            />
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Breadcrumbs tag={tag} />
                <PostList posts={posts} />
                <Pagination totalCount={totalCount} tagId={tag.id} currentPage={currentPage} />
            </Container>
        </Box>
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
                    const range = (start: number, end: number) =>
                        [...Array(end - start + 1)].map((_, i) => start + i)

                    return range(1, Math.ceil(totalCount / BLOG_PER_PAGE)).map(
                        (repo) => `/tags/${item.id}/page/${repo}`
                    )
                })
            return result
        })
    )
    return paths.flat()
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllTagPagePaths()
    return { paths, fallback: false }
}



export const getStaticProps: GetStaticProps<Props, { tagId: string, id: string }> = async ({ params }) => {
    if (!params) throw new Error("Error Tag ID Not Found");
    const tagId = params.tagId
    const pageId = Number(params.id);

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (Number(pageId) - 1) * BLOG_PER_PAGE,
            limit: BLOG_PER_PAGE, filters: `tag[contains]${tagId}`
        }
    });

    const tag = await client.getListDetail<PostTag>({
        endpoint: 'tag', contentId: tagId
    })

    return {
        props: {
            posts: data.contents,
            totalCount: data.totalCount,
            currentPage: pageId,
            tag: tag
        },
    };
};