import { Button, Card, CardBody, CardFooter, Flex } from "@chakra-ui/react";
import { messagesRepository } from "@repositories/messages";
import { requestsRepository } from "@repositories/requests";

export const SuccessSubmitPage = () => {
    const handleClick = () => {
        messagesRepository.reset();
        requestsRepository.reset();
    };

    return (
        <Card backgroundColor="whiteAlpha.700" borderWidth={3} borderColor="green.200" overflow="hidden" p={8}>
            <CardBody color="blackAlpha.700" fontSize="xl" textAlign="center">
                Ваша заявка принята! Свяжемся с вами в ближайшее время
            </CardBody>
            <CardFooter>
                <Flex justifyContent="center" w="100%">
                    <Button onClick={handleClick} colorScheme="green" variant="outline">
                        Сообщить о другой проблеме
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
};
