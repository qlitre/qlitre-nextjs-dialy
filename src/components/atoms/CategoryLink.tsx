import NextLink from "next/link";
import type { PostCategory } from "types/blog";
import {
    Link,
    Tag,
    TagLabel
} from "@chakra-ui/react";

type Props = {
    category: PostCategory;
}

export const CategoryLink = ({ category }: Props) => {
    return (
        <NextLink key={category.id} href={`/${category.id}/page/1`} passHref>
            <Link>
                <Tag variant='subtle' colorScheme='teal'>
                    <TagLabel fontSize="md">{category.name}</TagLabel>
                </Tag>
            </Link>
        </NextLink>
    );
};