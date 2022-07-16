import { MicroCMSImage } from 'microcms-js-sdk'

export type Tag = {
    id: string,
    name: string
}

export type Post = {
    id: string;
    title: string;
    description: string,
    keywords: string,
    tags: Tag[];
    text: string,
    createdAt: string
};
