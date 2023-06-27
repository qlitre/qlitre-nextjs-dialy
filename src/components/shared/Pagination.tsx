import NextLink from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BLOG_PER_PAGE } from 'settings/siteSettings';

import styles from "styles/components/shared/Pagination.module.scss";

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
        if (p === currentPage) return <span className={styles.paginationLinkCurrent}>{p}</span>
        return <NextLink className={styles.paginationLink} href={getPath(p)}>{p}</NextLink>;
    }
    const pager: number[] = []
    const numPages = Math.ceil(totalCount / BLOG_PER_PAGE)
    for (let i = 1; i < numPages + 1; i++) {
        if (i < currentPage - 2) continue
        if (i > currentPage + 2) continue
        pager.push(i)
    }
    return (
        <div className={styles.paginationLinkContainer}>
            {currentPage >= 2 && (
                <NextLink href={getPath(currentPage - 1)}>
                    <AiOutlineLeft className={styles.icon}></AiOutlineLeft>
                </NextLink>
            )}
            {currentPage >= 4 && (
                <>
                    {getPaginationItem(1)}
                </>
            )}
            {currentPage >= 5 && <span className={styles.paginationLinkNone}>...</span>}

            {pager.map((number) => (
                <>
                    {getPaginationItem(number)}
                </>
            ))}
            {currentPage <= numPages - 4 && <span className={styles.paginationLinkNone}>...</span>}
            {currentPage <= numPages - 3 && (
                <>
                    {getPaginationItem(numPages)}
                </>
            )}
            {currentPage < numPages && (
                <NextLink href={getPath(currentPage + 1)}>
                    <AiOutlineRight className={styles.icon}></AiOutlineRight>
                </NextLink>
            )}
        </div>
    );
};