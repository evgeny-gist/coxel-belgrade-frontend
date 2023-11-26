import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                background:
                    "linear-gradient(45deg, rgb(233, 216, 253, 0.4), rgb(196, 241, 249, 0.4), rgb(233, 216, 253, 0.4), rgb(196, 241, 249, 0.4))",
                minHeight: "100vh",
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
