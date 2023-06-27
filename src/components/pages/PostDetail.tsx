import { Suspense } from 'react';
import { FaTwitter } from "react-icons/fa";
import type { Post } from 'types/blog';
import { jstDatetime } from 'libs/jstDatetime';
import { PageTitle } from 'components/shared/PageTitle';
import { RepeatedBody } from 'components/shared/RepeatedBody';
import { Container } from 'components/shared/Container';
import { TagInline } from 'components/shared/TagInline';
import { GoogleAdSense } from 'components/shared/GoogleAdSense';
import { LineDivider } from 'components/shared/LineDivider';
import { LinkToHome } from 'components/shared/LinkToHome'
import { MarkdownTemplate } from 'components/shared/MarkdownTemplate';
import { TwitterShare } from 'components/shared/TwitterShare';
import { config } from 'settings/siteSettings';

import styles from 'styles/components/pages/PostDetail.module.scss';

type Props = {
    post: Post
}

export const PostDetail = ({ post }: Props) => {
    const published = jstDatetime(String(post.publishedAt), "YYYY年MM月DD日");
    return (
        <>
            <Container maxWidth='720px'>
                <PageTitle>{post.title}</PageTitle>
                <p className={styles.publishedAt}>{published}</p>
                <TagInline category={post.category} tags={post.tag} />
                <LineDivider />
                <section>
                    {post.useRepeatedBody ? <RepeatedBody repeatedBody={post.repeatedBody} /> : <MarkdownTemplate source={post.text} />}
                </section>
                <section className={styles.adsense}>
                    <Suspense fallback={null}>
                        <GoogleAdSense />
                    </Suspense>
                </section>
                <section className={styles.externalLinks}>
                    <div className={styles.shareButtons}>
                        <TwitterShare
                            className={styles.twitterButton}
                            text={post.title}
                            url={`${config.siteUrl}/post/${post.id}`}
                            via={config.social.twitter}>
                            <FaTwitter />
                            Share
                        </TwitterShare>
                    </div>
                </section>
                <div className={styles.linkToHome}>
                    <LinkToHome />
                </div>
            </Container>
        </>
    );
};