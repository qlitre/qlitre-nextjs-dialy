import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            p: {
                fontSize: { base: "md", md: "lg" },
                lineHeight: "tall"
            }
        }
    }
});