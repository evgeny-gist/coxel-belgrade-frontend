import { Heading, Container } from "@chakra-ui/react";
import { StepList } from "./components/step-list";

export const MainPage = () => {
    return (
        <Container w="100%">
            <Heading marginBottom={8} as="h1" fontSize="4xl">Приёмная</Heading>
            <StepList />
        </Container>
    );
};
