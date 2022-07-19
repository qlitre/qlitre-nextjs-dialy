import { jstDatetime } from 'utils/utils';

import { Text, Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    datetime: string;
}

export const Datetime: FC<Props> = ({ datetime }) => {
    const formatDate = jstDatetime(datetime, 'YYYY-MM-DD')
    return (
        <Box mt="4">
            <Text as="time" dateTime={formatDate} fontSize="xl" color="gray.500">
                {formatDate}
            </Text>
        </Box>
    );
};