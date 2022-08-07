import { jstDatetime } from 'utils/utils';
import { Text, Box } from "@chakra-ui/react";
import { useSecondaryColor } from "libs/useSecondaryColor"

type Props = {
    datetime: string;
}

export const Datetime = ({ datetime }: Props) => {
    const formatDate = jstDatetime(datetime, 'YYYY年MM月DD日')
    const secondaryColor = useSecondaryColor();
    return (
        <Box mt="4">
            <Text as="time" dateTime={formatDate} fontSize="sm" color={secondaryColor}>
                {formatDate}
            </Text>
        </Box>
    );
};