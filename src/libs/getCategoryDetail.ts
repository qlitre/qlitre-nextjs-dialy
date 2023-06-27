import { client } from './client'
import { PostCategory } from 'types/blog';
import { MicroCMSQueries } from 'microcms-js-sdk';

export const getCategoryDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<PostCategory>({
        endpoint: "category",
        contentId,
        queries,
    });

    return detailData;
};