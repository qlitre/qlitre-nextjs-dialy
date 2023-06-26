import type { Post } from 'types/blog';
import NextLink from "next/link";
import { PageTitle } from 'components/shared/PageTitle';
import { jstDatetime } from 'libs/jstDatetime';
import { TagInline } from 'components/shared/TagInline';
import styles from 'styles/components/shared/Article.module.scss';

type Props = {
    post: Post
}

export const Article = ({ post }: Props) => {
    //const secondaryColor = useSecondaryColor();
    const publied = jstDatetime(String(post.publishedAt), "YYYY年MM月DD日");
    return (
        <div>
            <NextLink href={`/post/${post.id}`} className={styles.titleLink}>
                <PageTitle>
                    {post.title}
                </PageTitle>
            </NextLink>
            <p className={styles.publishedAt}>{publied}</p>
            <p className={styles.description}>{post.description}</p>
            <TagInline category={post.category} tags={post.tag} />
            <NextLink href={`/post/${post.id}`} className={styles.linkButton}>続きを読む</NextLink>
        </div>
    );
};