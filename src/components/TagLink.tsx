import NextLink from "next/link";
import type { PostTag } from "types/blog";
import {
    Link,
    Tag,
    TagLabel
} from "@chakra-ui/react";

type Props = {
    tag: PostTag;
}

export const TagLink = ({ tag }: Props) => {
    return (
        <NextLink key={tag.id} href={`/tags/${tag.id}/page/1`} passHref>
            <Link>
                <Tag variant='subtle' colorScheme='cyan'>
                    <TagLabel fontSize="sm">{tag.name}</TagLabel>
                </Tag>
            </Link>
        </NextLink>
    );
};