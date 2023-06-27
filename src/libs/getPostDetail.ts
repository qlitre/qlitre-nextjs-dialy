import { client } from 'libs/client'
import type { MicroCMSQueries } from 'microcms-js-sdk';
import type { Post } from 'types/blog';

export const getPostDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Post>({
        endpoint: "post",
        contentId,
        queries,
    });

    return detailData;
};