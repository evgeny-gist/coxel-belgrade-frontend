import { Heading, Container, Image } from "@chakra-ui/react";
import { MessagesList } from "./components/messages-list";
import { RequestsForm } from "./components/requests-form";

export const MainPage = () => {
    return (
        <Container w="100%">
            <Heading
                marginBottom={10}
                as="h1"
                fontSize="4xl"
                fontWeight="800"
                color="blackAlpha.800"
            >
                Приёмочная
                <Image
                    ml={5}
                    display="inline-block"
                    height="0.8em"
                    src="https://em-content.zobj.net/source/apple/354/writing-hand_270d-fe0f.png"
                ></Image>
            </Heading>
            <MessagesList marginBottom={8} />
            <RequestsForm />
        </Container>
    );
};
