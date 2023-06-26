import type { AmazonAssociateLink } from "types/blog";
import styles from "styles/components/shared/AmazonLink.module.scss";

type Props = {
    content: AmazonAssociateLink;
}

export const AmazonLink = ({ content }: Props) => {
    return (
        <div className={styles.amazonLinkCard}>
            <div className={styles.left}>
                <a className={styles.title} href={content.productLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {content.productName}
                </a>
                <a className={styles.link} href={content.productLink}
                    target="_blank"
                    rel="noreferrer">
                    Amazonで購入する
                </a>
            </div>
            <div className={styles.right}>
                <img className={styles.img} src={content.productImage.url} alt={content.productName} />
            </div>
        </div>
    )
};