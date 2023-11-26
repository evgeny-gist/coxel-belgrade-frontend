import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                backgroundColor: "gray.50",
            },
        },
    },
    fonts: {
        heading: "'Rubik', sans-serif",
    },
    components: {
        Input: {
            baseStyles: {
                borderWidth: "4px",
            },
        },
    },
});
