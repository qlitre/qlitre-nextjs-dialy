import type { AmazonAssociateLink } from 'types/blog';
import {
    Box,
    Text,
    HStack,
    Spacer,
    Link,
    Image,
} from '@chakra-ui/react';

type Props = {
    content: AmazonAssociateLink;
}

export const AmazonLink = ({ content }: Props) => {
    return (
        <Box>
            <HStack spacing={1} padding="4" border="1px" borderColor="teal.400" borderRadius="md">
                <Box color="gray.500">
                    <Text fontSize="md" fontWeight="bold">
                        {content.productName}
                    </Text>
                    <Text marginTop="3">
                        <Link href={content.productLink}
                            color="cyan.700" fontWeight="bold"
                            isExternal={true} textDecoration="none">
                            Amazonで購入する
                        </Link>
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <Image maxHeight="150" src={content.productImage.url} />
                </Box>
            </HStack>
        </Box>
    )
};