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
        if (p === currentPage) {
            return (
                <span className={styles.active}>{p}</span>
            )
        }
        return (
            <NextLink className={styles.link} href={getPath(p)}>{p}</NextLink>
        )
    }
    const pager: number[] = []
    const numPages = Math.ceil(totalCount / BLOG_PER_PAGE)
    for (let i = 1; i < numPages + 1; i++) {
        if (i < currentPage - 2) continue
        if (i > currentPage + 2) continue
        pager.push(i)
    }
    return (
        <div className={styles.wrapper}>
            <ul className={styles.pager}>
                {currentPage >= 2 && (
                    <li className={styles.page}>
                        <NextLink className={styles.link} href={getPath(currentPage - 1)}>
                            <AiOutlineLeft className={styles.arrow}></AiOutlineLeft>
                        </NextLink>
                    </li>
                )}
                {currentPage >= 4 && (
                    <li className={styles.page}>
                        {getPaginationItem(1)}
                    </li>
                )}
                {currentPage >= 5 && <span className={styles.omission}>...</span>}

                {pager.map((number) => (
                    <li className={styles.page} key={number}>
                        {getPaginationItem(number)}
                    </li>
                ))}
                {currentPage <= numPages - 4 && <span className={styles.omission}>...</span>}
                {currentPage <= numPages - 3 && (
                    <li className={styles.page}>
                        {getPaginationItem(numPages)}
                    </li>
                )}
                {currentPage < numPages && (
                    <li className={styles.page}>
                        <NextLink className={styles.link} href={getPath(currentPage + 1)}>
                            <AiOutlineRight className={styles.arrow}></AiOutlineRight>
                        </NextLink>

                    </li>
                )}
            </ul>
        </div>
    );
};