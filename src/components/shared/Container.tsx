import { FC, ReactNode, CSSProperties } from "react";
import styles from "styles/components/shared/Container.module.scss";

type Props = {
    children: ReactNode;
    maxWidth?: string;
}

export const Container: FC<Props> = ({ children, maxWidth = '960px' }) => {
    const containerStyle: CSSProperties = { maxWidth: maxWidth };
    return <div className={styles.container} style={containerStyle}>{children}</div>;
};