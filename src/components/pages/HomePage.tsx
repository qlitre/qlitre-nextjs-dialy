import type { Tag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import type { Post } from 'types/blog';
import { Breadcrumbs } from 'components/shared/Breadcrumbs';
import { CategoryNavigation } from 'components/shared/CategoryNavigation'
import { ArticleList } from 'components/shared/ArticleList';
import { Pagination } from 'components/shared/Pagination';
import { Container } from 'components/shared/Container';

type Props = {
    posts: Post[];
    totalCount: number;
    categories: PostCategory[];
    currentPage: number
    category?: PostCategory;
    tag?: Tag;
};

export const HomePage = ({ posts, totalCount, categories, currentPage, category, tag }: Props) => {

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
            <Container>
                {getBreadcrumbs()}
                {getCategoryNavigation()}
                <ArticleList posts={posts} />
                {getPagination()}
            </Container>
        </>
    );
}