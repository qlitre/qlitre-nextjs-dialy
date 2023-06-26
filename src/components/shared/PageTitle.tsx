import { FC, ReactNode } from "react";
import styles from "styles/components/shared/PageTitle.module.scss";

export const PageTitle: FC<{ children: ReactNode }> = ({ children }) => {
    return <h1 className={styles.pageTitle}>{children}</h1>;
};