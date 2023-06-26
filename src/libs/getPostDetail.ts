import { client } from './client'
import { Post } from 'types/blog';
import { MicroCMSQueries } from 'microcms-js-sdk';

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