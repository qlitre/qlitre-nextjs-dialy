import { TwitterIntentTweet } from 'components/atoms/TwitterIntentTweet';
import {
    Icon,
    Button,
} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import React from 'react';
import { config } from 'settings/siteSettings'

type Props = {
    title: string;
    slug: string;
};

export const TwitterShare = ({ title, slug }: Props) => {
    return (
        <Button
            as={TwitterIntentTweet}
            text={title}
            url={`${config.siteUrl}/post/${slug}`}
            hashtags={["qlitredialy"]}
            via={config.social.twitter}
            colorScheme="twitter"
            leftIcon={<Icon as={FaTwitter} />}
        >
            Share
        </Button>
    )
}