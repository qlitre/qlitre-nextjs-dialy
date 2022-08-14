import {
    Box,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { range } from 'utils/utils';

type Props = {
    totalCount: number;
    currentPage?: number;
    categoryId?: string;
    tagId?: string;
};

export const Pagination = ({ totalCount, categoryId, tagId, currentPage = 1 }: Props) => {
    const getPath = (p: number) => {
        if (categoryId) return `/${categoryId}/page/${p}`
        if (tagId) return `/tags/${tagId}/page/${p}`;
        return `/page/${p}`;
    }
    const getPaginationItem = (p: number) => {
        if (p === currentPage) {
            return <Text fontSize="3xl" color="gray.700">{p}</Text>
        };
        return <Link href={getPath(p)} fontSize="3xl" color="gray.400">{p}</Link>;
    }

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