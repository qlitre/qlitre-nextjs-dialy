import type { PostTag } from 'types/blog';
import type { Post } from 'types/blog';
import { Header } from 'components/organisms/Header';
import { Breadcrumbs } from 'components/atoms/Breadcrumbs';
import { PostList } from 'components/organisms/PostList';
import { Pagination } from 'components/organisms/Pagination';
import { Footer } from 'components/organisms/Footer'
import { Container } from "@chakra-ui/react";


type Props = {
    posts: Post[];
    totalCount: number;
    currentPage?: number
    tag?: PostTag;
};

export const Home = ({ posts, totalCount, currentPage, tag }: Props) => {
    const getBreadcrumbs = () => {
        if (tag) return <Breadcrumbs tag={tag} />
        return <Breadcrumbs />
    }

    const getPagination = () => {
        if (tag) return <Pagination totalCount={totalCount} currentPage={currentPage} tagId={tag.id} />
        if (currentPage) return <Pagination totalCount={totalCount} currentPage={currentPage} />
        return <Pagination totalCount={totalCount} />
    };

    return (
        <>
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                {getBreadcrumbs()}
                <PostList posts={posts} />
                {getPagination()}
            </Container>
            <Footer />
        </>
    );
}