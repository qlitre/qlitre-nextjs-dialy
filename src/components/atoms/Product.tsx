import {
    Box,
    HStack,
    Icon,
    Link,
    Stack,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";

type Props = {
    name: string;
    href: string;
    description: string;
}

export const Product = ({ href, name, description }: Props) => {
    return (
        <Link
            isExternal
            href={href}
            display="flex"
            gap="3"
            borderRadius="md"
            border="1px solid"
            borderColor="teal.500"
            _hover={{ boxShadow: "md" }}
        >
            <Stack flex="1" padding="4">
                <Box fontWeight="bold">{name}</Box>
                <Box fontSize="sm" color="gray.500" flex="1">
                    {description}
                </Box>
                <HStack color="teal.500" spacing="1" justifyContent="flex-end">
                    <Box as="span" fontSize="sm">
                        サイトへ
                    </Box>
                    <Icon as={MdArrowForward} />
                </HStack>
            </Stack>
        </Link>
    );
};