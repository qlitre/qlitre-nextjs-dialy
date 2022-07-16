import { Pagination } from '../../components/Pagination';
import { client } from '../../libs/client';
import { GetStaticPaths, GetStaticProps, } from "next";
import type { Post } from "../../types/blog";
import { Header } from '../../components/Header'
import { PostList } from '../../components/PostList';
import {
    Box,
    Container,
    Heading,
} from "@chakra-ui/react";

const PER_PAGE = 10;

type Props = {
    posts: Post[]
    totalCount: number
};


export default function BlogPageId({ posts, totalCount }: Props) {
    return (
        <Box>
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Heading as="h1" marginBottom="8" fontSize="2xl">
                    Blog
                </Heading>
                <PostList posts={posts} />
                <Pagination totalCount={totalCount} />
            </Container>
        </Box>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const repos = await client.get({ endpoint: "post" });
    const pageNumbers = [];
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
    if (!params) throw new Error("Component file name must has params.");
    const id = params.id;

    const data = await client.get({ endpoint: "post", queries: { offset: (Number(id) - 1) * 10, limit: 10 } });

    return {
        props: {
            posts: data.contents,
            totalCount: data.totalCount,
        },
    };
};