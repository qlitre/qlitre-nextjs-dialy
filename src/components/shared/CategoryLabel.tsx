import type { PostCategory } from "types/blog";
import NextLink from "next/link";

import styles from "styles/components/shared/CategoryLabel.module.scss";


type Props = {
    category: PostCategory
}

export const CategoryLabel = ({ category }: Props) => {
    return (
        <NextLink href={`/${category.id}/page/1`}>
            <span className={styles.categoryLabel}>{category.name}</span>
        </NextLink>)
};