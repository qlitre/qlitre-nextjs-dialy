import type { GetStaticPaths, GetStaticProps, } from "next";
import type { Post } from "types/blog";
import { client } from 'libs/client';
import { SEO } from 'components/SEO';
import { Header } from 'components/Header';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { PostList } from 'components/PostList';
import { Pagination } from 'components/Pagination';
import {
    Box,
    Container,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';

type Props = {
    posts: Post[]
    totalCount: number
    currentPage: number
};


export default function BlogPageId({ posts, totalCount, currentPage }: Props) {
    return (
        <Box>
            <SEO
                type="website"
                pagePath={`/page/${currentPage}`}
                title={`ページ: ${currentPage}`}
                description={`${currentPage}ページ目の記事一覧`}
            />
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Breadcrumbs />
                <PostList posts={posts} />
                <Pagination totalCount={totalCount} currentPage={currentPage} />
            </Container>
        </Box>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const repos = await client.get({ endpoint: "post" });
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / BLOG_PER_PAGE)).map((repo) => `/page/${repo}`);
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
    if (!params) throw new Error("Component file name must has params.");
    const pageId = Number(params.id);

    const data = await client.get({
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