import { notFound } from "next/navigation";
import { getPostDetail } from "libs/getPostDetail";
import { getPostList } from "libs/getPostList";
import { PostDetail } from "components/pages/PostDetail";
import { getMetadataArticle } from "libs/getMetadataArticle";
import { getMetadataWebsite } from "libs/getMetadataWebsite";
import { jstDatetime } from "libs/jstDatetime";
import { Metadata } from "next";

type Params = {
    slug: string;
}

export async function generateStaticParams() {
    const { contents } = await getPostList();

    const paths = contents.map((post) => {
        return {
            postId: post.id,
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

