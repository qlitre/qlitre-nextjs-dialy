import type { PostCategory, Tag } from "types/blog";
import { CategoryLabel } from "components/shared/CategoryLabel";
import { TagLabel } from "components/shared/TagLabel";
import styles from 'styles/components/shared/TagInline.module.scss';


type Props = {
    category: PostCategory;
    tags: Tag[]
}

export const TagInline = ({ category, tags }: Props) => {
    return (
        <div className={styles.tags}>
            <CategoryLabel category={category} />
            {tags.map((tag) => (
                <TagLabel key={tag.id} tag={tag} />
            ))}
        </div>
    );
}
