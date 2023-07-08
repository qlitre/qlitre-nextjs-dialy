import { notFound, redirect } from 'next/navigation';
import { getPostDetailDraft } from 'libs/getPostDetailDraft';
import { PostDetail } from "components/pages/PostDetail";
import { Container } from 'components/shared/Container';
import { CSSProperties } from 'react';

type Params = {
    params: { slug: string };
    searchParams: { draftKey: string | string[] };
};

export default async function PostDetailDraft({
    params: { slug },
    searchParams: { draftKey },
}: Params) {
    // 変更せずにプレビューすると空になる
    if (typeof draftKey !== 'string' || draftKey === '') {
        redirect(`/post/${slug}`);
    }

    // ここではキャッシュが無視される
    const post = await getPostDetailDraft(slug, { draftKey });
    if (!post) {
        notFound();
    }
    const style: CSSProperties = {
        color: 'blue',
        fontSize: '20px',
        textAlign: 'center',
    };

    return (
        <>
            <Container maxWidth='720px'>
                {draftKey && (
                    <p style={style}>プレビューモードだよ</p>
                )}
            </Container >
            <PostDetail post={post} />

        </>
    );
}
