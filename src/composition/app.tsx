import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { MainPage } from "@pages/main";

export function App() {
    return (
        <ChakraProvider>
            <Container py={4} display="flex" flexDirection="column" alignItems="center">
                <MainPage />
            </Container>
        </ChakraProvider>
    );
}
