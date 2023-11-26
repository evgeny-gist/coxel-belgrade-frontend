import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { MainPage } from "@pages/main";
import { SuccessSubmitPage } from "@pages/success-submit";
import { requestsRepository } from "@repositories/requests";
import { observer } from "mobx-react";

export function App() {
    return (
        <ChakraProvider>
            <Container py={12} display="flex" flexDirection="column" alignItems="center">
                <AppContent />
            </Container>
        </ChakraProvider>
    );
}

const AppContent = observer(() => {
    const { submitted } = requestsRepository;

    if (submitted) {
        return <SuccessSubmitPage />;
    }

    return <MainPage />;
});
