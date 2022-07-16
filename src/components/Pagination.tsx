import Router from 'next/router';
import {
    Box,
    HStack,
    Link,
} from "@chakra-ui/react";

type Props = {
    totalCount: number;
};

export const Pagination = ({ totalCount }: Props) => {
    const PER_PAGE = 10;
    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
    return (
        <Box>
            <HStack spacing='24px' justifyContent="center">
                {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                    <Link href={`/page/${number}`} fontSize="3xl" key={index}>
                        {number}
                    </Link>
                ))}
            </HStack>

        </Box>
    );
};