import { client } from 'libs/client'
import type { Tag } from 'types/blog';
import type { MicroCMSQueries } from 'microcms-js-sdk';

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