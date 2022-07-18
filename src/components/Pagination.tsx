import {
    Box,
    HStack,
    Link,
} from "@chakra-ui/react";

type Props = {
    totalCount: number;
    tagId?: string;
};

export const Pagination = ({ totalCount, tagId }: Props) => {
    const getPath = (p: number) => {
        if (tagId) return `/tags/${tagId}/page/${p}`
        return `/page/${p}`
    }
    const PER_PAGE = 10;
    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
    return (
        <Box>
            <HStack spacing='10' justifyContent="center">
                {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                    <Link href={getPath(number)} fontSize="3xl" key={index}>
                        {number}
                    </Link>
                ))}
            </HStack>
        </Box>
    );
};