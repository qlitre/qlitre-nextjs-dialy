import { CSSProperties } from "react";
import styles from "styles/components/shared/Container.module.scss";

type Props = {
    mt: string;
    mb: string;
}

export const Spacer = ({ mt, mb }: Props) => {
    const containerStyle: CSSProperties = { marginTop: mt, marginBottom: mb };
    return <div style={containerStyle} />;
};