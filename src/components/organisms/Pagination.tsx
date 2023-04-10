import {
    Box,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


type Props = {
    totalCount: number;
    currentPage: number;
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
            return (
                <Box
                    as="span"
                    fontSize="2xl"
                    bg="teal.400"
                    color="white"
                    px={2}
                    borderRadius="md"
                    h={4}
                >
                    {p}
                </Box>
            )
        };
        return <Link href={getPath(p)} fontSize="2xl" color="gray.400">{p}</Link>;
    }
    const pager: number[] = []
    const numPages = Math.ceil(totalCount / BLOG_PER_PAGE)
    for (let i = 1; i < numPages + 1; i++) {
        if (i < currentPage - 2) continue
        if (i > currentPage + 2) continue
        pager.push(i)
    }
    return (
        <HStack spacing='6' justifyContent="center">
            {currentPage >= 2 && (
                <Link href={getPath(currentPage - 1)} fontSize="3xl">
                    <ChevronLeftIcon />
                </Link>
            )}
            {currentPage >= 4 && (
                <Box >
                    {getPaginationItem(1)}
                </Box>
            )}
            {currentPage >= 5 && <Text color="gray.400" fontSize="3xl">...</Text>}

            {pager.map((number) => (
                <Box key={number}>
                    {getPaginationItem(number)}
                </Box>
            ))}
            {currentPage <= numPages - 4 && <span>...</span>}
            {currentPage <= numPages - 3 && (
                <Box >
                    {getPaginationItem(numPages)}
                </Box>
            )}
            {currentPage < numPages && (
                <Link href={getPath(currentPage + 1)} fontSize="3xl">
                    <ChevronRightIcon />
                </Link>
            )}
        </HStack>
    );
};