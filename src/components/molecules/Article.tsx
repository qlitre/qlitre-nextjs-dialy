import type { Post } from 'types/blog';
import { useSecondaryColor } from 'libs/useSecondaryColor';
import { Datetime } from 'components/atoms/Datetime';
import { CategoryLink } from 'components/atoms/CategoryLink';
import { TagLink } from 'components/atoms/TagLink';
import {
    Box,
    Button,
    Heading,
    Link,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {
    post: Post
}

export const Article = ({ post }: Props) => {
    const secondaryColor = useSecondaryColor();
    return (
        <Box as='article'>
            <Link href={`/post/${post.id}`}>
                <Heading
                    as="h2"
                    fontSize="2xl"
                    lineHeight={1.6}
                    cursor="pointer"
                >
                    {post.title}
                </Heading>
            </Link>
            <Datetime datetime={post.publishedAt} />
            <Text mt="1" fontSize="md" color={secondaryColor}>{post.description}</Text>
            <Stack mt="5" mb="5" />
            <Wrap>
                <WrapItem>
                    <CategoryLink category={post.category} />
                </WrapItem>
                {post.tag.map(tag => (
                    <WrapItem key={tag.id}>
                        <TagLink tag={tag} />
                    </WrapItem>
                ))}
            </Wrap>
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
        </Box>
    );
};