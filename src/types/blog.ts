import type { MicroCMSListContent } from "microcms-js-sdk";
import type { MicroCMSImage } from "microcms-js-sdk";

/*Tagという名前だとChakra UIのTagと名前が衝突する*/
export type Tag = {
    name: string;
} & MicroCMSListContent;

export type PostCategory = {
    name: string;
} & MicroCMSListContent;

export type RichEditor = {
    richText: string;
}

export type AmazonAssociateLink = {
    productName: string;
    productImage: MicroCMSImage;
    productLink: string;
}

export type Body = {
    fieldId: 'richEditor' | 'amazonLink'
} & RichEditor & AmazonAssociateLink;


export type Post = {
    title: string;
    thumbnail: MicroCMSImage;
    description: string;
    keywords: string;
    category: PostCategory;
    tag: Tag[];
    text: string;
    useRepeatedBody: boolean;
    repeatedBody: Body[];
} & MicroCMSListContent;
