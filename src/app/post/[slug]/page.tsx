import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostDetail } from "libs/getPostDetail";
import { getAllPostsContents } from "libs/getAllPostsContents";
import { getMetadataArticle } from "libs/getMetadataArticle";
import { getMetadataWebsite } from "libs/getMetadataWebsite";
import { jstDatetime } from "libs/jstDatetime";
import { PostDetail } from "components/pages/PostDetail";

type Params = {
    slug: string;
}

export async function generateStaticParams() {
    const allPosts = await getAllPostsContents();
    const paths = allPosts.map((post) => {
        return {
            slug: post.id,
        };
    });

    return [...paths];
}

export default async function StaticDetailPage({
    params }: { params: Params }) {
    const post = await getPostDetail(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <PostDetail post={post} />
        </>
    );
}


export const generateMetadata = async (
    { params }: { params: Params; }): Promise<Metadata> => {
    try {
        const post = await getPostDetail(params.slug);
        const publishedAt = jstDatetime(String(post.publishedAt));
        const updatedAt = jstDatetime(String(post.updatedAt));

        return getMetadataArticle({
            pagePath: `/post/${params.slug}`,
            publishedTime: publishedAt ?? undefined,
            modifiedTime: updatedAt ?? undefined,
            tags: post.tag.map((tag) => tag.name),
            title: post.title,
            description: post.description,
            thumbnail: post.thumbnail?.url ?? undefined,
        });
    } catch (error) {
        return getMetadataWebsite({
            pagePath: `/post/${params.slug}`,
            title: "Not Found",
            description: "記事が見つかりませんでした",
            noindex: true,
        });
    }
};

