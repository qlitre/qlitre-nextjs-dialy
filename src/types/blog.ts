import { MicroCMSImage } from 'microcms-js-sdk'

/*Tagという名前だとChakra UIのTagと名前が衝突する*/
export type PostTag = {
    id: string,
    name: string
}

export type Post = {
    id: string;
    title: string;
    description: string,
    keywords: string,
    tag: PostTag[];
    text: string,
    createdAt: string
    publishedAt: string
};
