import type { Post } from '../types/blog'
import {
    Box,
    Heading,
    Stack,
    Link,
    Text,
    Button,
} from "@chakra-ui/react";
import { Datetime } from '../components/Datetime'

type Props = {
    posts: Post[]
}


export const PostList = ({ posts }: Props) => {
    return (
        <>
            {posts.map(post => (
                <>
                    <Box key={post.id}>
                        <Link href={`/post/${post.id}`}>
                            <Heading
                                as="h2"
                                fontSize="3xl"
                                lineHeight={1.6}
                                marginTop="4"
                                flex={1}
                                cursor="pointer"
                            >
                                {post.title}
                            </Heading>
                        </Link>
                        <Datetime datetime={post.publishedAt} format="yyyy-MM-dd" />
                        <Text mt="2" fontSize="xl" >{post.description}</Text>
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