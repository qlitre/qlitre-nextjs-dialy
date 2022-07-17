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
    Heading,
} from "@chakra-ui/react";

const PER_PAGE = 10;

type Props = {
    posts: Post[]
    totalCount: number
    tag: PostTag
};


export default function TagId({ posts, totalCount, tag }: Props) {
    return (
        <Box>
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Breadcrumbs tag={tag} />
                <PostList posts={posts} />
                <Pagination totalCount={totalCount} tagId={tag.id} />
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

                    return range(1, Math.ceil(totalCount / PER_PAGE)).map(
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
    if (!params) throw new Error("Component file name must has params.");
    const tagId = params.tagId
    const id = params.id;

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (Number(id) - 1) * 10,
            limit: 10, filters: `tag[contains]${tagId}`
        }
    });

    const tag = await client.getListDetail<PostTag>({
        endpoint: 'tag', contentId: tagId
    })

    return {
        props: {
            posts: data.contents,
            totalCount: data.totalCount,
            tag: tag
        },
    };
};