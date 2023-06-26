import styles from 'styles/components/shared/Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <p className={styles.text}><small>© 2023 qlitre</small></p>
            </div>
        </footer>
    );
};