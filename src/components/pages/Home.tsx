import type { PostTag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import type { Post } from 'types/blog';
import { Header } from 'components/organisms/Header';
import { Breadcrumbs } from 'components/molecules/Breadcrumbs';
import { CategoryNavigation } from 'components/molecules/CategoryNavigation'
import { PostList } from 'components/organisms/PostList';
import { Pagination } from 'components/organisms/Pagination';
import { Footer } from 'components/organisms/Footer'
import { Container, Stack, Spacer } from "@chakra-ui/react";


type Props = {
    posts: Post[];
    totalCount: number;
    categories: PostCategory[];
    currentPage?: number
    category?: PostCategory;
    tag?: PostTag;
};

export const Home = ({ posts, totalCount, categories, currentPage, category, tag }: Props) => {
    const getBreadcrumbs = () => {
        if (category) return <Breadcrumbs category={category} />
        if (tag) return <Breadcrumbs tag={tag} />
        return <Breadcrumbs />
    }

    const getPagination = () => {
        if (category) return <Pagination totalCount={totalCount} currentPage={currentPage} tagId={category.id} />
        if (tag) return <Pagination totalCount={totalCount} currentPage={currentPage} tagId={tag.id} />
        if (currentPage) return <Pagination totalCount={totalCount} currentPage={currentPage} />
        return <Pagination totalCount={totalCount} />
    };

    const getCategoryNavigation = () => {
        if (category) return <CategoryNavigation categories={categories} activeCategoryId={category.id} />
        return <CategoryNavigation categories={categories} />
    }

    return (
        <>
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Stack spacing={4}>
                    {getBreadcrumbs()}
                    {getCategoryNavigation()}
                    <Spacer />
                    <PostList posts={posts} />
                    {getPagination()}
                </Stack>
            </Container>
            <Footer />
        </>
    );
}