import { Heading, Container } from "@chakra-ui/react";
import { MessagesList } from "./components/messages-list";

export const MainPage = () => {
    return (
        <Container w="100%">
            <Heading marginBottom={8} as="h1" fontSize="4xl">Приёмная</Heading>
            <MessagesList />
        </Container>
    );
};
