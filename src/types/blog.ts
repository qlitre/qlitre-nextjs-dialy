import { MicroCMSListContent } from "microcms-js-sdk";

/*Tagという名前だとChakra UIのTagと名前が衝突する*/
export type PostTag = {
    name: string
} & MicroCMSListContent

export type Post = {
    title: string;
    description: string,
    keywords: string,
    tag: PostTag[];
    text: string,
} & MicroCMSListContent;
