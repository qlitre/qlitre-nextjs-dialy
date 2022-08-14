import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { PostCategory } from 'types/blog';
import type { Post } from 'types/blog';
import { client } from 'libs/client';
import { SEO } from 'components/molecules/SEO';
import { Home } from 'components/pages/Home';
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { getCategoryContents } from 'libs/getCategoryContents';
import { range } from 'utils/utils'

type Props = {
    posts: Post[];
    categories: PostCategory[];
    totalCount: number;
    currentPage: number;
    category: PostCategory;
};

export default function BlogCategoryId({ posts, categories, totalCount, currentPage, category }: Props) {
    return (
        <>
            <SEO
                type="website"
                pagePath={`/categories/${category.id}/page/${currentPage}`}
                title={`category: ${category.name}`}
                description={`カテゴリー"${category.name}" の記事一覧`}
            />
            <Home posts={posts} totalCount={totalCount} categories={categories} currentPage={currentPage} category={category} />
        </>
    );
}

const getAllCategoryPagePaths = async () => {
    const resCategory = await client.getList({
        endpoint: 'category',
    })

    const paths: string[][] = await Promise.all(
        resCategory.contents.map((item: PostCategory) => {
            const result = client
                .getList<Post>({
                    endpoint: 'post',
                    queries: {
                        filters: `category[equals]${item.id}`,
                    },
                })
                .then(({ totalCount }) => {
                    return range(1, Math.ceil(totalCount / BLOG_PER_PAGE)).map(
                        (repo) => `/${item.id}/page/${repo}`
                    )
                })
            return result
        })
    );
    return paths.flat();
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllCategoryPagePaths()
    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    if (!params) throw new Error("Error Tag ID Not Found");
    const categoryId = String(params.category);
    const pageId = Number(params.id);

    const data = await client.getList<Post>({
        endpoint: "post",
        queries: {
            offset: (pageId - 1) * BLOG_PER_PAGE,
            limit: BLOG_PER_PAGE, filters: `category[equals]${categoryId}`
        }
    });

    const categories = await getCategoryContents()

    const category = await client.getListDetail<PostCategory>({
        endpoint: 'category', contentId: categoryId
    });

    return {
        props: {
            posts: data.contents,
            categories: categories,
            totalCount: data.totalCount,
            currentPage: pageId,
            category: category
        },
    };
};