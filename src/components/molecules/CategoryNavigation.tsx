import NextLink from "next/link";
import type { PostCategory } from "types/blog";
import { Flex, Link, useColorModeValue } from "@chakra-ui/react";

type Props = {
    categories: PostCategory[];
    activeCategoryId?: string
}

export const CategoryNavigation = ({ categories, activeCategoryId }: Props) => {
    return (
        <Flex
            as="nav"
            gap="4"
            alignItems="center"
            borderBottom="2px solid"
            borderColor={useColorModeValue("gray.300", "gray.600")}
        >
            {categories.map(category => (
                <NavigationLink
                    href={`/${category.id}/page/1`}
                    categoryId={category.id}
                    activeCategoryId={activeCategoryId} key={category.id}>
                    {category.name}
                </NavigationLink>
            ))}
        </Flex>
    );
};

type ChildProps = {
    href: string;
    children: string;
    categoryId: string;
    activeCategoryId?: string;
}

const NavigationLink = ({ href, children, categoryId, activeCategoryId }: ChildProps) => {
    const isActive = categoryId === activeCategoryId;
    const nonActiveFontColor = useColorModeValue("blackAlpha.500", "whiteAlpha.600");
    const activeBorderColor = useColorModeValue("gray.800", "gray.300");

    return (
        <NextLink href={href} passHref>
            <Link
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="12"
                py="2"
                px="4"
                color={isActive ? undefined : nonActiveFontColor}
                marginBottom="-2px"
                borderBottomWidth="1px"
                borderBottomColor={isActive ? activeBorderColor : "transparent"}
                _hover={{ bgColor: useColorModeValue("blackAlpha.100", "whiteAlpha.200") }}>
                {children}
            </Link>
        </NextLink>
    );
};