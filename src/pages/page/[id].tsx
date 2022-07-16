import Link from 'next/link';
import { Pagination } from '../../components/Pagination';
import { client } from '../../libs/client';
import { GetStaticPaths, GetStaticProps, } from "next";
import type { Post } from "../../types/blog";
import { Header } from '../../components/Header'
import { FC } from "react";
import {
    Box,
    Container,
    Heading,
    Button,
    Text,
    Spacer,
    Stack
} from "@chakra-ui/react";
import { Datetime } from '../../components/Datetime'

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
                <Stack>
                    {posts.map(post => (
                        <>
                            <Box>
                                <Link href={`/post/${post.id}`}>
                                    <Heading
                                        as="h2"
                                        fontSize="3xl"
                                        lineHeight={1.6}
                                        marginTop="4"
                                        flex={1}
                                        cursor="pointer"
                                    >
                                        {post.title}
                                    </Heading>
                                </Link>
                                <Datetime datetime={post.createdAt} format="yyyy-MM-dd" />
                                <Text mt="2" color="gray.600" fontSize="md">{post.description}</Text>
                                <Link href={`/post/${post.id}`}>
                                    <Button
                                        colorScheme='teal'
                                        variant='outline'
                                        size="sm"
                                        mt="8"
                                    >
                                        続きを読む
                                    </Button>
                                </Link>
                            </Box>
                            <Box>
                                <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
                            </Box>
                        </>
                    ))}
                </Stack>
                <Pagination totalCount={totalCount} />
            </Container>
        </Box>

    );
}

// 動的なページを作成
// 動的なページを作成
export const getStaticPaths: GetStaticPaths = async () => {
    const repos = await client.get({ endpoint: "post" });
    const pageNumbers = [];
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

// データを取得
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