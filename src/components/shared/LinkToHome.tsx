import NextLink from "next/link";
import { MdArrowForward } from "react-icons/md";
import styles from "styles/components/shared/LinkToHome.module.scss";

export const LinkToHome = () => {
    return (
        <NextLink className={styles.linkToHome} href="/">
            <span>記事一覧へ</span>
            <MdArrowForward />
        </NextLink>
    );
};