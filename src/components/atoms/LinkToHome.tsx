import { Icon, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdArrowForward } from 'react-icons/md';


export const LinkToHome = () => {
    return (
        <NextLink href='/' passHref>
            <Link
                display="flex"
                alignItems="center"
                gap="2"
                p="4"
                textDecoration="underline"
                _hover={{ color: "cyan.500" }}>
                <span>記事一覧へ</span>
                <Icon as={MdArrowForward} />
            </Link>
        </NextLink>
    );
};