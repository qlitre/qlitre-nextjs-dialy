import { Suspense } from "react";
import styles from "styles/components/shared/RichLinkCard.module.scss";
import { fetchSiteMetadata } from "libs/fetchSiteMetadata";
import { config } from "settings/siteSettings";

type Props = {
    href: string;
    isExternal: boolean;
    linkText: string;
}


export const RichLinkCard: React.FC<Props> = ({ href, isExternal, linkText }) => {
    return (
        <Suspense fallback={<RichLinkCardSkeleton />}>
            <RichLinkCardInner href={href} isExternal={isExternal} linkText={linkText} />
        </Suspense>
    );
};

const RichLinkCardInner: React.FC<Props> = async ({ href, isExternal, linkText }) => {
    const url = new URL(href, config.siteUrl);
    const metadata = await fetchSiteMetadata(url.href);

    if (!metadata) {
        return (
            <a href={href} className={styles.textLink}
                target="_blank"
                rel="noreferrer">
                {linkText}
            </a>
        );
    }

    return (
        <a className={styles.cardRoot} href={metadata.url} target="_blank" rel="noreferrer">
            <div className={styles.loadedMetadata}>
                <div className={styles.loadedMetadataTitle}>
                    {metadata.title ? metadata.title : metadata.url}
                </div>
                <div className={styles.loadedMetadataDescriptionContainer}>
                    <div className={styles.loadedMetadataDescription}>{metadata.description}</div>
                </div>
                <div className={styles.loadedMetadataSite}>
                    <span className={styles.loadedMetadataSiteName}>{url.hostname}</span>
                </div>
            </div>
            {metadata.image && (
                <div className={styles.loadedMetadataImageContainer}>
                    <img className={styles.loadedMetadataImage} src={metadata.image} alt="" />
                </div>
            )}
        </a>
    );
};


const RichLinkCardSkeleton: React.FC = () => {
    return (
        <div className={styles.cardRoot}>
            <div className={styles.skeletonMetadata}>
                <div className={styles.skeletonTextContainer}>
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonTextShorter} />
                </div>
                <div className={styles.skeletonTextContainer}>
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonTextShorter} />
                </div>
                <div className={styles.skeletonSiteIcon} />
            </div>
            <div className={styles.skeletonImage} />
        </div>
    );
};