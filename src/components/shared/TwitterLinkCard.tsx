'use client';
import { TwitterTweetEmbed } from 'react-twitter-embed';

type Props = {
    twitterId: string;
}

export const TwitterLinkCard = ({ twitterId }: Props) => {
    return <TwitterTweetEmbed tweetId={twitterId} />;
};