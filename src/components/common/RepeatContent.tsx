import type { Body } from 'types/blog';
import { MarkdownTemplate } from 'components/common/MarkdownTemplate';
import {
    Box,
    Text,
    HStack,
    Spacer,
    Link,
    Image,
} from '@chakra-ui/react';

type Props = {
    body: Body;
}

export const RepeatContent = ({ body }: Props) => {

    const AmazonLink = () => {
        return (
            <Box>
                <HStack spacing={1} padding="4" border="1px" borderColor="teal.400" borderRadius="md">
                    <Box color="gray.500">
                        <Text fontSize="md" fontWeight="bold">
                            {body.productName}
                        </Text>
                        <Text marginTop="3">
                            <Link href={body.productLink}
                                color="cyan.700" fontWeight="bold"
                                isExternal={true} textDecoration="none">
                                Amazonで購入する
                            </Link>
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Image maxHeight="150" src={body.productImage.url} />
                    </Box>
                </HStack>
            </Box>
        )
    }

    const RichText = () => {
        return (
            <MarkdownTemplate source={body.richText} />
        )
    }

    return (
        <>
            {body.fieldId === 'richEditor' ? RichText() : AmazonLink()}
        </>
    );
};