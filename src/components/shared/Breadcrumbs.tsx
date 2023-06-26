import type { Tag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import NextLink from "next/link";
import { CategoryLabel } from 'components/shared/CategoryLabel';
import { TagLabel } from 'components/shared/TagLabel';
import { AiOutlineRight } from "react-icons/ai";

import styles from "styles/components/shared/Breadcrumbs.module.scss";

type Props = {
    category?: PostCategory;
    tag?: Tag;
};

export const Breadcrumbs = ({ category, tag }: Props) => {
    return (
        <div className={styles.breadcrumbsContainer}>
            <NextLink className={styles.home} href='/'>Home</NextLink>
            {category && (
                <>
                    <AiOutlineRight className={styles.icon} />
                    <CategoryLabel category={category} />
                </>
            )}
            {tag && (
                <>
                    <AiOutlineRight className={styles.icon} />
                    <TagLabel tag={tag} />
                </>
            )}
        </div>
    );
};