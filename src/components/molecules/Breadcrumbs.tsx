import type { PostTag } from 'types/blog';
import type { PostCategory } from 'types/blog';
import { CategoryLink } from 'components/atoms/CategoryLink';
import { TagLink } from 'components/atoms/TagLink';
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
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' fontSize="xl" fontWeight="bold" />}>
            <BreadcrumbItem>
                <BreadcrumbLink href='/' fontSize="xl" fontWeight="bold" >Home</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
                <BreadcrumbItem>
                    <CategoryLink category={category} />
                </BreadcrumbItem>
            )}
            {tag && (
                <BreadcrumbItem>
                    <TagLink tag={tag} />
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};