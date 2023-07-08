import { client } from 'libs/client'
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { Post } from 'types/blog';

export const getPostDetailDraft = async (
    contentId: string,
    queries?: MicroCMSQueries & { draftKey?: string }
) => {
    const detailData = await client.getListDetail<Post>({
        endpoint: "post",
        contentId,
        queries,
        // draftKeyが不変でも内容は変わるためキャッシュを無視
        customRequestInit: { cache: 'no-store' },
    });

    return detailData;
};