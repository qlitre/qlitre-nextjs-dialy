import type { Post } from 'types/blog';
import { Article } from 'components/shared/Article';
import { LineDivider } from 'components/shared/LineDivider';

type Props = {
    posts: Post[]
}

export function ArticleList({ posts }: Props) {
    return (
        <>
            {posts.map(post => (
                <div key={post.id}>
                    <Article post={post} />
                    <LineDivider />
                </div>
            ))}

        </>
    );
}