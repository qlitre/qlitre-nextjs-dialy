import type { Tag } from "types/blog";
import NextLink from "next/link";
import {AiFillTag} from "react-icons/ai";
import styles from "styles/components/shared/TagLabel.module.scss";


type Props = {
    tag: Tag
}

export const TagLabel = ({ tag }: Props) => {
    return (
        <NextLink href={`/tags/${tag.id}/page/1`}>
            <span className={styles.tagLabel}>
                <AiFillTag className={styles.tagIcon} />
                {tag.name}
                </span>
        </NextLink>)
};