import type { Post } from 'types/blog';
import { Article } from 'components/molecules/Article';
import { Box, Stack, } from '@chakra-ui/react';

type Props = {
    posts: Post[]
}

export function ArticleList({ posts }: Props) {
    return (
        <>
            {posts.map(post => (
                <Box key={post.id}>
                    <Article post={post} />
                    <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
                </Box>
            ))}

        </>
    );
}