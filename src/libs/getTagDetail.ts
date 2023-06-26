import { client } from './client'
import { Tag } from 'types/blog';
import { MicroCMSQueries } from 'microcms-js-sdk';

export const getTagDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Tag>({
        endpoint: "tag",
        contentId,
        queries,
    });

    return detailData;
};