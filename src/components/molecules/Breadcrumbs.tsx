import type { PostTag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

type Props = {
    category?: PostCategory;
    tag?: PostTag;
};

export const Breadcrumbs = ({ category, tag }: Props) => {
    return (
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' fontSize="xl" fontWeight="bold" />} mb="8">
            <BreadcrumbItem>
                <BreadcrumbLink href='/' fontSize="2xl" fontWeight="bold" >Home</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/${category.id}/page/1`} fontSize="2xl" fontWeight="bold">Category&quot{category.name}&quot</BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {tag && (
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/tags/${tag.id}/page/1`} fontSize="2xl" fontWeight="bold">Tag &quot{tag.name}&quot</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};