import { Metadata } from "next";
import { config } from "settings/siteSettings";


type Props = {
    pagePath: string;
    title?: string;
    description?: string;
    noindex?: boolean;
    publishedTime: string;
    modifiedTime: string | undefined;
    tags: string[];
    thumbnail?: string | undefined;
};

export function getMetadataArticle(
    props: Props): Metadata {

    const openGraph: Metadata["openGraph"] = {
        type: "article",
        authors: [`https://twitter.com/${config.social.twitter}`],
        publishedTime: props.publishedTime,
        modifiedTime: props.modifiedTime,
        tags: props.tags,
        url: config.siteUrl + props.pagePath,
        title: props.title,
        description: props.description,
        siteName: config.siteTitle,
        images: {
            url: props.thumbnail ? props.thumbnail : config.siteUrl + "/myprof.jpeg",
            width: 1200,
            height: 630,
        },
    }

    return {
        title: props.title ? `${props.title} | ${config.siteTitle}` : config.siteTitle,
        robots: props.noindex ? "noindex" : undefined,
        description: props.description,
        twitter: {
            card: "summary_large_image",
            creator: `@${config.social.twitter}`,
        },
        openGraph: openGraph,
    };
}