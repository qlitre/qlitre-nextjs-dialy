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
                    <BreadcrumbLink fontSize="md" fontWeight="bold">
                        <CategoryLink category={category} />
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {tag && (
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/tags/${tag.id}/page/1`} fontSize="md" fontWeight="bold">
                        <TagLink tag={tag} />
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};