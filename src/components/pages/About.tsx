import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Product } from "components/shared/Product";
import { config } from 'settings/siteSettings';

import styles from 'styles/components/pages/About.module.scss';

export const About = () => {
    return (
        <main className={styles.main}>

                <div className={styles.flex}>
                    <img
                        className={styles.avatar}
                        alt="Qlitre"
                        src="/myprof.jpeg"
                    />
                </div>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Qlitre</h1>
                    <p className={styles.description}>
                        株式会社で働いています。<br />
                        趣味、プログラミング、読書、音楽を聴く。<br />
                        好きなアーティスト、柴田聡子さん。<br />
                    </p>
                    <div className={styles.icons}>
                        <a aria-label="GitHub" href={config.github} className={styles.icon}><FaGithub size="1.5em" /></a>
                        <a aria-label="Twitter" href={config.twitterTop} className={styles.twitterIcon}><FaTwitter size="1.5em" /></a>
                    </div>
                    <h1 className={styles.heading}>このサイトについて</h1>
                    <p className={styles.description}>
                        Next.js + microCMS + Chakra UIで自作した日記サイトです。<br />
                        日常のことを書いています。<br />
                        別でプログラミングブログもやっています。<br />
                    </p>
                    <div className={styles.spacer} />
                    <Product href='https://qlitre-weblog.com/'
                        name='qlitre-weblog' description='プログラミングブログ。Pythonの記事が中心です。' />
                </div>
        </main>

    );
}