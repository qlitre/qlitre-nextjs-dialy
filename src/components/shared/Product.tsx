import styles from 'styles/components/shared/Product.module.scss';

type Props = {
    name: string;
    href: string;
    description: string;
}

export const Product = ({ href, name, description }: Props) => {
    return (
        <div className={styles.product}>
            <div className={styles.content}>
                <a className={styles.title} href={href}>
                    {name}
                </a>
                <div className={styles.description}>
                    {description}
                </div>
                <a className={styles.link} href={href}>
                    <span>サイトへ</span>
                    <span className={styles.icon}>&rarr;</span>
                </a>
            </div>
        </div>
    );
};