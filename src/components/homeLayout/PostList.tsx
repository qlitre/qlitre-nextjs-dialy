import type { Post } from 'types/blog';
import { useSecondaryColor } from 'libs/useSecondaryColor';
import { Datetime } from 'components/common/Datetime';
import { TagLink } from 'components/common/TagLink';
import {
    Box,
    Heading,
    Stack,
    Link,
    Text,
    Button,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {
    posts: Post[]
}

export const PostList = ({ posts }: Props) => {
    const secondaryColor = useSecondaryColor();
    return (
        <>
            {posts.map(post => (
                <Box key={post.id}>
                    <Wrap>
                        {post.tag.map(tag => (
                            <WrapItem key={tag.id}>
                                <TagLink tag={tag} />
                            </WrapItem>
                        ))}
                    </Wrap>
                    <Link href={`/post/${post.id}`}>
                        <Heading
                            as="h2"
                            fontSize="2xl"
                            lineHeight={1.6}
                            marginTop="1"
                            flex={1}
                            cursor="pointer"
                        >
                            {post.title}
                        </Heading>
                    </Link>
                    <Datetime datetime={post.publishedAt} />
                    <Text mt="1" fontSize="md" color={secondaryColor}>{post.description}</Text>
                    <Link href={`/post/${post.id}`}>
                        <Button
                            colorScheme='teal'
                            variant='outline'
                            size="sm"
                            mt="8"
                            rightIcon={<ArrowForwardIcon />}>
                            続きを読む
                        </Button>
                    </Link>
                    <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
                </Box>
            ))}
        </>
    );
};