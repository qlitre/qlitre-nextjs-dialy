import { NextSeo } from "next-seo";
import { config } from "settings/siteSettings";

type BaseProps = {
    pagePath: string;
    title?: string;
    description?: string;
    keyword?: string;
    noindex?: boolean;
    thumbnailUrl?: string;
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
    thumbnailUrl,
}) => {
    const siteTitle = config.siteTitle;
    const ogImageUrl = thumbnailUrl ? thumbnailUrl : config.siteUrl + '/myprof.jpeg';

    return (
        <NextSeo
            title={title}
            titleTemplate={`%s | ${siteTitle}`}
            defaultTitle={siteTitle}
            description={description}
            canonical={config.siteUrl + pagePath}
            noindex={noindex}
            twitter={{
                cardType: "summary_large_image",
                site: `@${config.twitterAccount}`,
                handle: `@${config.twitterAccount}`,
            }}
            openGraph={{
                type: type,
                url: config.siteUrl + pagePath,
                title: title,
                description: description,
                site_name: siteTitle,
                images: [
                    {
                        url: ogImageUrl,
                        width: 600,
                        height: 315,
                    },
                ],
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