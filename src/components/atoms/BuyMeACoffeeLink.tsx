import { Image } from '@chakra-ui/react';
import { config } from 'settings/siteSettings'

export const BuyMeACoffeeLink = () => {
    return (
        <a
            href={config.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                h="10"
                htmlHeight="40"
            />
        </a>
    )
}