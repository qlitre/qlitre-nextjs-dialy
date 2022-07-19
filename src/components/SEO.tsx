import { NextSeo } from "next-seo";
import { config } from 'settings/siteSettings'

type BaseProps = {
    pagePath: string;
    title?: string;
    description?: string;
    noindex?: boolean;
};

type ForWebsiteProps = {
    type: "website";
    publishedTime?: undefined;
    tags?: undefined;
};

type ForArticleProps = {
    type: "article";
    publishedTime: string;
    tags: string[];
};

export const SEO: React.FC<BaseProps & (ForWebsiteProps | ForArticleProps)> = ({
    type,
    pagePath,
    title,
    description,
    noindex,
    publishedTime,
    tags,
}) => {
    const siteTitle = config.siteTitle;

    return (
        <NextSeo
            title={title}
            titleTemplate={`%s | ${siteTitle}`}
            defaultTitle={siteTitle}
            noindex={noindex}
            twitter={{
                cardType: "summary_large_image",
                handle: `@${config.social.twitter}`,
            }}
            openGraph={{
                type: type,
                url: config.siteUrl + pagePath,
                title: title,
                description: description,
                site_name: siteTitle,
                article:
                    type === "article"
                        ? {
                            authors: [`https://twitter.com/${config.social.twitter}`],
                            publishedTime: publishedTime,
                            tags: tags,
                        }
                        : undefined,
            }}
        />
    );
};