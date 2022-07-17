import type { Post } from 'types/blog'
import {
    Box,
    Heading,
    Stack,
    Link,
    Text,
    Button,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import { Datetime } from 'components/Datetime'
import { TagLink } from 'components/TagLink'

type Props = {
    posts: Post[]
}

export const PostList = ({ posts }: Props) => {
    return (
        <>
            {posts.map(post => (
                <>
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
                                fontSize="3xl"
                                lineHeight={1.6}
                                marginTop="1"
                                flex={1}
                                cursor="pointer"
                            >
                                {post.title}
                            </Heading>
                        </Link>
                        <Datetime datetime={post.publishedAt} format="yyyy-MM-dd" display="block" fontSize="xl" color="gray.500" mt="2" />
                        <Text mt="1" fontSize="xl" color="gray.500">{post.description}</Text>
                        <Link href={`/post/${post.id}`}>
                            <Button
                                colorScheme='teal'
                                variant='outline'
                                size="sm"
                                mt="8"
                            >
                                続きを読む
                            </Button>
                        </Link>
                    </Box>
                    <Box>
                        <Stack mt="10" mb="10" borderBottom="1px" borderColor="gray.300" />
                    </Box>
                </>
            ))}
        </>
    )
}