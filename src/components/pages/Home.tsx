import type { PostTag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import type { Post } from 'types/blog';
import { Header } from 'components/organisms/Header';
import { Breadcrumbs } from 'components/molecules/Breadcrumbs';
import { CategoryNavigation } from 'components/molecules/CategoryNavigation'
import { ArticleList } from 'components/organisms/ArticleList';
import { Pagination } from 'components/organisms/Pagination';
import { Footer } from 'components/organisms/Footer'
import { Container, Stack, Spacer } from "@chakra-ui/react";


type Props = {
    posts: Post[];
    totalCount: number;
    categories: PostCategory[];
    currentPage: number
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
        if (category) return <Pagination totalCount={totalCount} currentPage={currentPage} categoryId={category.id} />
        if (tag) return <Pagination totalCount={totalCount} currentPage={currentPage} tagId={tag.id} />
        if (currentPage) return <Pagination totalCount={totalCount} currentPage={currentPage} />
        return <Pagination totalCount={totalCount} currentPage={currentPage} />
    };

    const getCategoryNavigation = () => {
        if (category) return <CategoryNavigation categories={categories} activeCategoryId={category.id} />
        return <CategoryNavigation categories={categories} />
    }
    
    return (
        <>
            <Header />
            <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
                <Stack spacing={6}>
                    {getBreadcrumbs()}
                    <Spacer />
                    {getCategoryNavigation()}
                    <Spacer />
                    <ArticleList posts={posts} />
                    {getPagination()}
                </Stack>
            </Container>
            <Footer />
        </>
    );
}