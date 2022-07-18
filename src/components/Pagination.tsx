import {
    Box,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings'

type Props = {
    totalCount: number;
    currentPage?: number
    tagId?: string;
};

export const Pagination = ({ totalCount, tagId, currentPage = 1 }: Props) => {
    const getPath = (p: number) => {
        if (tagId) return `/tags/${tagId}/page/${p}`
        return `/page/${p}`
    }
    const getPaginationItem = (p: number) => {
        if (p === currentPage) {
            return <Text fontSize="3xl" color="gray.700">{p}</Text>
        }
        return <Link href={getPath(p)} fontSize="3xl" color="gray.400">{p}</Link>
    }
    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <HStack spacing='10' justifyContent="center">
            {range(1, Math.ceil(totalCount / BLOG_PER_PAGE)).map((number, index) => (
                <Box key={index}>
                    {getPaginationItem(number)}
                </Box>
            ))}
        </HStack>
    );
};